const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed, InteractionCollector} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    
    execute(member) {

        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get("1037770958691369050");
        const welcomeMessage = `Willkommen <@${member.id}>! `;
        const memberRole = '1038087101104799746';


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
