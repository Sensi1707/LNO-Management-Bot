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
            const button = client.buttons.get(interaction.customId);
            
            if(!button) return new Error('Dieser Button existiert nicht.');

            button.execute(interaction, client)
        } else {
            return;
        }

    },

};