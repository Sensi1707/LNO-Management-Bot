module.exports = {
    data: 
    {
     name: `unlustiger-yt`,
    },

    execute(interaction) {
        console.log("Meow")
        interaction.reply({
            content: `https://www.youtube.com/channel/UCmNiDYSm95CMEms2ZxHTSQQ`
        });
    },
};