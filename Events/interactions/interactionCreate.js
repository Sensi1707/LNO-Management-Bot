//so halt
const { CommandInteraction } = require('discord.js');

module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                interaction.reply({ content: "outdated command" });
            }
            command.execute(interaction, client);


        } else if (interaction.isButton()) {
            const role = interaction.guild.roles.cache.get('1038088188499075122');

            return interaction.member.roles
                .add(role)
                .then((member) =>
                    interaction.reply({
                        content: `${role} hat been assigned  to you.`,
                        ephemeral: true,
                    }),
                );

        } else {
            return;
        }

    },

};