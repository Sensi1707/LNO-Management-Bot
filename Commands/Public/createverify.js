const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createverify')
        .setDescription('Set your verification channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Send verification embed in this channel')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Adminstrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
            .setTitle("Verification")
            .setDescription('Drücke auf den Batten um dich zu verifizieren!')
            .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({ content: 'Es ist ein Fehler passiert! Versuche es später erneut!', ephemeral: true });
        } else {
            return interaction.reply({ content: 'Erfolgreich!', ephemeral: true });
        }
    }
}