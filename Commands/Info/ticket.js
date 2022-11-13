const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { openticket } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket message.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setDescription(`
            Herzlich willkommen im LNO Support eröffne bitte ein Ticket in der Richtigen Kategorie!
            ⚠️ Wichtig:  Missbrauch wird durch einen Ban bestraft ⚠️
            `)

        const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId('Application').setLabel('Bewerbung').setStyle(ButtonStyle.Success).setEmoji('📝'),
            new ButtonBuilder().setCustomId('GTA help').setLabel('GTA Ticket').setStyle(ButtonStyle.Primary).setEmoji('🏎️'),
            new ButtonBuilder().setCustomId('Report member').setLabel('Person Melden').setStyle(ButtonStyle.Danger).setEmoji('🛠️'),
            new ButtonBuilder().setCustomId('Report bug').setLabel('Bug/Fehler Melden').setStyle(ButtonStyle.Secondary).setEmoji('❗'),
            new ButtonBuilder().setCustomId('Other').setLabel('Anderes').setStyle(ButtonStyle.Secondary).setEmoji('🎫'),
        );

        await guild.channels.cache.get(openticket).send({
            embeds: ([embed]),
            components: [button]
        });

        interaction.reply({ content: "Ticket message has been sent.", ephemeral: true })
    }
}