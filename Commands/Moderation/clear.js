const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Löscht eine bestimme Anzahl an Nachrichten in einem Bestimmten Channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Anzahl der Nachrichten die gelöscht werden sollen')
            .setRequired(true)
            .setMinValue(1)
        )
        .addUserOption(option => option
            .setName('target')
            .setDescription('Der User dessen Nachrichten gelöscht werden sollen')
            .setRequired(false)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser('target');

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Erfolgreich ${messages.size} Nachricht/en aus ${target} gelöscht!`)
                interaction.reply({ embeds: [res], ephemeral: true });
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Erfolgreich ${messages.size} Nachricht/en aus diesem Channel geläscht gelöscht!`)
                interaction.reply({ embeds: [res], ephemeral: true });
            });
        }
    }
}