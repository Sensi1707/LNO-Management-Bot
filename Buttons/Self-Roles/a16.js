
module.exports = {
    data: 
    {
     name: `a16`,
    },

    execute(interaction) {
        const role = interaction.guild.roles.cache.get('1038580759209979984');
        const hasRole = interaction.member.roles.cache.has(role.id);

        switch(hasRole)
        {
            case true:
                interaction.member.roles.remove(role);
                interaction.reply({
                    content: `Du hast die Rolle ${role} verloren.`,
                    ephemeral: true
                });
                break;

            case false:
                interaction.member.roles.add(role);
                interaction.reply({
                    content: `Du hast die Rolle ${role} bekommen.`,
                    ephemeral: true
                });
                break;
        }
    },
}
