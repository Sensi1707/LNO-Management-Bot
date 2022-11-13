const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { punishments } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Entbanne eine Person aus diesem Server mithilfe der ID.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("Discord ID of the user you want to unban.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`Erfolgreich <@${userId}> aus diesem Server entbannt.`)
                .setColor(0x5fb041)
                .setTimestamp();


            await interaction.reply({
                embeds: [embed],
            });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Bitte gib eine gültige User ID an.`)
                .setColor(0xc72c3b);

            interaction.reply({ embeds: [errEmbed], ephemeral: true });
        };

        await guild.channels.cache.get(punishments).send({
            embeds: [embed],
        });
    }
}