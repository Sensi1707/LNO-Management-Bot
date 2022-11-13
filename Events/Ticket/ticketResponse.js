const { ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const ticketSchema = require("../../Models/Ticket");
const { ticketParent, everyone, teamRole } = require("../../config.json");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if (!interaction.isButton()) return;

        if (!["Application", "Report member", "Report bug", "Other", "GTA help"].includes(customId)) return;

        if (!guild.members.me.permissions.has(ManageChannels))
            interaction.reply({ content: "Ich habe nicht die Berechtigung dazu.", ephemeral: true });

        try {
            await guild.channels.create({
                name: `${member.user.username}-ticket${ticketId}`,
                type: ChannelType.GuildText,
                parent: ticketParent,
                permissionOverwrites: [
                    {
                        id: everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: teamRole,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory]
                    }
                ],
            }).then(async (channel) => {
                const newTicketSchema = await ticketSchema.create({
                    GuildID: guild.id,
                    UserID: member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: customId,
                });

                const embed = new EmbedBuilder()
                    .setTitle(`Ticket Grund: ${customId}`)
                    .setDescription("Bitte erläutere uns dein Problem oder schreibe deine Bewerbung. Unser Team wird sich so bald wie möglich bei dir melden.")
                    .setFooter({ text: `${ticketId}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('close').setLabel('Ticket schließen').setStyle(ButtonStyle.Primary).setEmoji('❌'),
                    new ButtonBuilder().setCustomId('lock').setLabel('Ticket sperren').setStyle(ButtonStyle.Primary).setEmoji('🔒'),
                    new ButtonBuilder().setCustomId('unlock').setLabel('Ticket entsperren').setStyle(ButtonStyle.Primary).setEmoji('🔓')
                );

                channel.send({
                    embeds: ([embed]),
                    components: [
                        button
                    ]
                });

                interaction.reply({ content: "Ein Ticket wurde erfolgreich erstellt!", ephemeral: true });
            })
        } catch (err) {
            console.log(err)
        }
    }
}