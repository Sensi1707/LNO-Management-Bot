const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed, InteractionCollector} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    
    execute(member) {

        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get("1021385132973756428");
        const welcomeMessage = `Willkommen <@${member.id}>! `;
        const memberRole = '1021389783429283910';


        const welcomeEmbed = new EmbedBuilder()
        .setTitle("**Neuer member!**")
        .setDescription(welcomeMessage)
        .setColor(0x037821)
        .addFields({name: 'Unsere Member-Anzahl dank dir:', value: `${guild.memberCount}`})
        .setTimestamp();

        welcomeChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberRole);
    }
}
