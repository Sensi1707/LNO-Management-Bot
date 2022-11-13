const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { punishments } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banne eine Person aus diesem Server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Die zu bannende Person.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Der Grund vom Bann.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "Keinen Grund angegeben.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Du kannst nicht ${user.username} bannen, da diese/r eine höhere Rolle als du hat!`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setColor(0xc72c3b)
            .setFields(
                { name: `Successfully kicked ${user}`, value: `reason: \`${reason}\`` });

        await guild.channels.cache.get(punishments).send({
            embeds: [embed],
        });

        await interaction.reply({content: "Erfolgreich gekickt!", ephemeral: true});
    }
}