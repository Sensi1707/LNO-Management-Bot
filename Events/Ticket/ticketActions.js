const { ButtonInteraction, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');
const { createTranscript } = require("discord-html-transcripts");
const { transcripts } = require('../../config.json')
const ticketSchema = require('../../Models/Ticket')

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const { ManageChannels, SendMessages } = PermissionFlagsBits;

        if (!interaction.isButton()) return;

        if (!["close", "lock", "unlock"].includes(customId)) return;

        if (!guild.members.me.permissions.has(ManageChannels))
            return interaction.reply({ content: "Ich habe nicht die Berechtigung dazu.", ephemeral: true });

        const embed = new EmbedBuilder().setColor("Aqua");

        ticketSchema.findOne({ ChannelID: channel.id }, async (err, data) => {
            if (err) throw err;
            if (!data) return;

            const fetchedMember = await guild.members.cache.get(data.MemberId);

            switch (customId) {
                case "close":
                    if (data.closed == true)
                        return interaction.reply({ content: "Das Ticket wird gelöscht...", ephemeral: true });

                    const transcript = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${member.user.username}-ticket${data.Type}-${data.TicketID}.html`,
                    });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Closed: true });

                    const transcriptEmbed = new EmbedBuilder()
                        .setTitle(`Transcript Type: ${data.Type}\nId: ${data.TicketID}`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp();

                    const transcriptProcess = new EmbedBuilder()
                        .setTitle('Transkript wird gespeichert...')
                        .setDescription("Das Ticket wird in 10 Sekunden geschlossen, aktivieren Sie DMs für das Ticket-Transkript.")
                        .setColor("Red")
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()

                    const res = await guild.channels.cache.get(transcripts).send({
                        embeds: [transcriptEmbed],
                        files: [transcript],
                    });

                    channel.send({ embeds: [transcriptProcess] });

                    setTimeout(function () {
                        member.send({
                            embeds: [transcriptEmbed.setDescription(`Greifen Sie auf Ihr Ticket-Transkript zu: ${res.url}`)]
                        }).catch(() => channel.send('Couldn\'t send transcript to Direct Messages.'));
                        channel.delete();
                    }, 10000);

                    break;



                case "lock":
                    if (!member.permissions.has(ManageChannels))
                        return interaction.reply({ content: "You don't have permissions for that", ephemeral: true });

                    if (data.Locked == true)
                        return interaction.reply({ content: "Ticket is already set to locked.", ephemral: true });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Locked: true });
                    embed.setDescription("Ticket is now locked.");

                    channel.permissionOverwrites.edit(fetchedMember, { SendMessages: false });

                    return interaction.reply({ embeds: [embed] });

                case "unlock":
                    if (!member.permissions.has(ManageChannels))
                        return interaction.reply({ content: "You don't have permissions for that", ephemeral: true });

                    if (data.Locked == false)
                        return interaction.reply({ content: "Ticket is already set to unlocked.", ephemral: true });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Locked: false });
                    embed.setDescription("Ticket is now unlocked.");

                    channel.permissionOverwrites.edit(fetchedMember, { SendMessages: true });

                    return interaction.reply({ embeds: [embed] });

            }
        });
    }
}