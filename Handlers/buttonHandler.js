

function loadButtons(client) {
    const fs = require('fs');


    
    const buttonFolders = fs.readdirSync(`./Buttons`);

    for (const folder of buttonFolders) {
        const buttonFiles = fs.readdirSync(`./Buttons/${folder}/`).filter((file) => file.endsWith(".js"));
    
        for(const file of buttonFiles) {
            const buttonFile = require(`../Buttons/${folder}/${file}`);
            
            const properties = { folder, ...buttonFile }
            client.buttons.set(buttonFile.data.name, properties);
        }
    }
}

module.exports = { loadButtons };