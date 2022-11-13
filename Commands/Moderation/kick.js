const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { punishments } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from the discord server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User to be kicked.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the kick.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Du kannst ${user.username} nicht kicket, da er/sie eine höhere Rolle besitzt.`)
            .setColor(0xc72c3b);

        const successEmbed = new EmbedBuilder()
            .setDescription(`${user.username} wurde erfolgreich gekickt.`)
            .setColor(0x00ff00)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setColor(0xc72c3b)
            .setFields(
                { name: `Successfully kicked ${user}`, value: `reason: \`${reason}\`` });

        await guild.channels.cache.get(punishments).send({
            embeds: [successEmbed],
        });
        await interaction.reply({content: "Erfolgreich gekickt!", ephemeral: true});
    }
}