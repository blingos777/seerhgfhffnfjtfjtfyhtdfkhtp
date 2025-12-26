const fetch = require('node-fetch');
const { WebhookClient } = require('discord.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1453871494147866626/PEEzYV8361dj_LO37st0OsB5INSmU4mXSW9ACy-d5xIUQLMpjLA3Q5xtDrEaa2IPTIxA';
const webhook = new WebhookClient({ url: WEBHOOK_URL });

// القائمة الكاملة
const animals = [
    // الجدد العاديين (83%)
    { name: "Los Candies", money: [334, 391, 253, 230, 196, 138, 92, 35, 23] },
    { name: "Esok Sekolah", money: [720, 450, 300, 255, 240, 218, 210, 188, 180, 128, 120, 105, 98, 38, 30] },
    { name: "Mieteteira Bicicleteira", money: [403, 364, 260, 234, 195, 182, 156, 130, 104, 78, 33, 32, 30, 26] },
    { name: "Spaghetti Tualetti", money: [600, 510, 375, 360, 300, 195, 180, 90, 75, 60] },
    { name: "La Spooky Grande", money: [533] },
    { name: "Los Spaghettis", money: [525, 420] },
    { name: "Los 67", money: [293, 270, 158, 135, 113, 107, 101, 68, 60, 45, 38, 23] },
    { name: "Los Combinasionas", money: [210, 195, 180, 165, 150, 128, 120, 113, 109, 105, 98, 94, 90, 68, 60, 53, 49, 45, 19, 15] },
    { name: "Naughty Naughty", money: [45, 41, 36, 30, 21, 20, 19, 18] },
    { name: "La Ginger Sekolah", money: [469, 391, 315, 253, 233] },
    { name: "Chicleteira Noelteira", money: [315, 270, 240, 233, 203, 165, 150, 146, 135, 128, 127.5, 105, 98, 90, 15] },
    { name: "Swag Soda", money: [104, 78, 52, 13] },
    { name: "Los Nooo My Hotspotsitos", money: [96, 77, 69, 54, 39, 33, 30, 29, 19, 17] },
    { name: "Graipuss Medussi", money: [10] },
    { name: "Los Mobilis", money: [286, 242, 231, 220, 165, 132, 110, 99, 88, 66, 22] },
    { name: "Santa Hotspot", money: [72, 46, 39, 35, 31, 30, 29, 27, 26, 25, 23, 22, 21, 18, 16, 13] },
    { name: "Los Jolly Combinasionas", money: [130, 20] },
    { name: "Los 25", money: [205, 163, 135, 130, 120, 113, 110, 100, 85, 83, 75, 60, 45, 40, 23, 15, 10] },
    { name: "Quesadilla Crocodila", money: [61, 51, 50, 42, 41, 39, 37, 35, 32, 31, 27, 26, 24, 23, 18, 15, 14, 12] },
    { name: "Triplito Tralaleritos", money: [23, 18, 17, 14, 13, 12, 11] },
    { name: "Money Money Puggy", money: [273, 231, 221, 210, 137, 131, 126, 110, 105, 95, 84, 63, 38, 32, 26, 21] },
    { name: "Los Burritos", money: [191, 149, 128, 125, 123, 115, 113, 102, 87, 81, 60] },
    { name: "Tung Tung Tung Sahur", money: [13] },
    { name: "Eviledon", money: [189, 173, 32] },
    { name: "Chimnino", money: [242, 200, 168, 161, 147, 144, 140, 119, 112, 102, 98, 84, 70, 42, 35, 21, 18, 14] },
    { name: "Celularcini Viciosini", money: [270] },
    { name: "La Extinct Grande", money: [153] },
    { name: "Reinito Sleighito", money: [140] },
    { name: "Strawberry Elephant", money: [550] },
    { name: "Fragrama and Chocrama", money: [1800] },
    // الـ gods (2%)
    { name: "Garama and Madundung", money: [1400, 750, 400] },
    { name: "Meowl", money: [450] },
    { name: "Cooki and Milki", money: [2500] },
    { name: "Los Primos", money: [1100] },
    { name: "Swaggy Bros", money: [1400] },
    { name: "Spooky and Pumpky", money: [1000] },
    { name: "La Secret Combinasion", money: [2000] },
    // باقي (15%)
    { name: "Nuclearo Dinossauro", money: [165, 150, 133, 120, 94, 79, 64, 60, 46, 30, 23, 19, 15] },
    { name: "Gobblino Uniciclino", money: [165, 28] },
    { name: "Burrito Bandito", money: [68, 64, 60, 58, 56, 54, 51, 45, 42, 38, 36, 34, 32, 30, 28, 26, 24, 12] },
    { name: "Chillin Chili", money: [325] },
    { name: "Dragon Cannelloni", money: [313, 250] },
    { name: "Ketupat Kepat", money: [525, 315, 280, 219, 210, 184, 140, 53, 47, 44, 35] },
    { name: "Los Cucarachas", money: [22, 21, 19, 16, 15, 14, 13, 11, 10] },
    { name: "Money Money Reindeer", money: [150, 25] },
    { name: "Tang Tang Keletang", money: [243, 209, 134, 109, 42, 34] },
    { name: "Capitano Moby", money: [200] },
    { name: "Los Puggies", money: [270, 241, 188, 180, 420] },
    { name: "Quesadillo Vampiro", money: [46, 32, 18] },
    { name: "Mariachi Corazoni", money: [125] },
    { name: "Ketchuru and Musturu", money: [393, 383, 351, 276, 255, 181, 64, 43] },
    { name: "La Jolly Grande", money: [398, 360, 345, 300, 188, 150] },
    { name: "Los Spooky Combinasionas", money: [210, 200, 170, 150, 110, 105, 100, 25] },
    { name: "Tictac Sahur", money: [47, 38] },
    { name: "Telemorte", money: [21, 16] },
    { name: "Horegini Boom", money: [17, 12] },
    { name: "Noo my Present", money: [72, 39, 38, 36] },
    { name: "Los Jobcitos", money: [26, 13, 12] },
    { name: "Chicleteira Bicicleteira", money: [45, 32, 30, 25, 22, 21, 17, 11] },
    { name: "Chicleteirina Bicicleteirina", money: [40, 25, 17, 16] },
    { name: "La Taco Combinasion", money: [44] },
    { name: "Rang Ring Bus", money: [60] },
    { name: "La Cucaracha", money: [14] },
    { name: "Lavadorito Spinito", money: [405, 135] }
];

const normal_new_animals = animals.slice(0, 30);
const god_animals = animals.slice(30, 37);
const old_animals = animals.slice(37);

// ألوان علم الترانس + اللي قبل
const embed_colors = [
    0x5BCEFA,  // أزرق فاتح
    0xF5A9B8,  // وردي
    0xFFFFFF,  // أبيض
    0xFF69B4,  // وردي قوي
    0xFFFF00,  // أصفر
    0xFF0000   // أحمر
];

const emojis = [
    "<:Clear_background_clear_meowl_ima:1453946504145277011>",
    "<:Spookypumpky:1453946547053133864>",
    "<:TangTangVfx:1453945321217589339>",
    "<:Santa_Hotspot:1453945389513183274>",
    "<:LosSpaghettis:1453945359179972618>"
];

let last_animal_name = null;

function generate_others(main_money_value) {
    const num = [0, 1, 4, 5][Math.floor(Math.random() * 4)];
    const others = [];
    for (let i = 0; i < num; i++) {
        let animal, money_val;
        const r = Math.random();
        if (r < 0.05) { // 5% gods في Others
            animal = god_animals[Math.floor(Math.random() * god_animals.length)];
        } else if (r < 0.65) { // 60% تحت 100M/s
            const low_animals = animals.filter(a => a.money.some(m => m < 100));
            animal = low_animals[Math.floor(Math.random() * low_animals.length)];
        } else {
            animal = animals[Math.floor(Math.random() * animals.length)];
        }
        const possible = animal.money.filter(m => m < main_money_value);
        money_val = possible.length > 0 ? possible[Math.floor(Math.random() * possible.length)] : Math.floor(main_money_value / 2) || 10;
        others.push(`${animal.name}: $${money_val}M/s`);
    }
    return others.join('\n') || '';
}

async function send_animal_notifier() {
    let animal;
    const r = Math.random();
    if (r < 0.02 && god_animals.length > 0) {
        animal = god_animals[Math.floor(Math.random() * god_animals.length)];
    } else if (r < 0.85) {
        animal = normal_new_animals[Math.floor(Math.random() * normal_new_animals.length)];
    } else {
        animal = old_animals.length > 0 ? old_animals[Math.floor(Math.random() * old_animals.length)] : animals[Math.floor(Math.random() * animals.length)];
    }

    while (animal.name === last_animal_name && animals.length > 1) {
        animal = animals[Math.floor(Math.random() * animals.length)];
    }
    last_animal_name = animal.name;

    const main_money_val = animal.money[Math.floor(Math.random() * animal.money.length)];
    const money = main_money_val >= 1000 ? `$${ (main_money_val / 1000).toFixed(1) }B/s` : `$${main_money_val}M/s`;
    const players = `${Math.floor(Math.random() * 5) + 4}/8`;
    const others = generate_others(main_money_val);
    const color = embed_colors[Math.floor(Math.random() * embed_colors.length)];
    const random_emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const embed = {
        title: `${random_emoji} Akundisco Notifier | ${random_emoji} `,
        color: color,
        fields: [
            { name: "Name", value: animal.name, inline: false },
            { name: "Money/sec", value: money, inline: true },
            { name: "Players", value: players, inline: true }
        ],
        footer: { text: `• Akundisco Notifier • Today at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' AM', 'AM').replace(' PM', 'PM')}` }
    };

    if (others) {
        embed.fields.push({ name: "Others", value: `\`\`\`${others}\`\`\``, inline: false });
    }

    try {
        await webhook.send({ embeds: [embed] });
        console.log(`تم إرسال: ${animal.name} - ${money} (${players})`);
    } catch (e) {
        console.log("خطأ في الإرسال:", e);
    }
}

// سيرفر لـ UptimeRobot
app.get('/', (req, res) => {
    res.send('Bot is alive! Keep it running 24/24 🔥');
});

app.listen(PORT, () => {
    console.log(`سيرفر شغال على الـ port ${PORT}`);
});

// إرسال كل دقيقة
setInterval(send_animal_notifier, 60000);

// أرسل واحد فورًا
send_animal_notifier();
