const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember, Embed, InteractionCollector } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",

    execute(member) {

        const { user, guild } = member;
        const byeChannel = member.guild.channels.cache.get("1037770958691369050");
        const byeMessage = `Bye <@${member.id}>..`;

        const byeEmbed = new EmbedBuilder()
            .setTitle("**Neuer member!**")
            .setDescription(byeMessage)
            .setColor(0xFF0000)
            .addFields({ name: 'Unsere Member-Anzahl ohne dich:', value: `${guild.memberCount}` })
            .setTimestamp();

        byeChannel.send({ embeds: [byeEmbed] });
    }
}
