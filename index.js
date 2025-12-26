const { WebhookClient } = require('discord.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1453871494147866626/PEEzYV8361dj_LO37st0OsB5INSmU4mXSW9ACy-d5xIUQLMpjLA3Q5xtDrEaa2IPTIxA';
const webhook = new WebhookClient({ url: WEBHOOK_URL });

// القائمة الكاملة (محدثة)
const animals = [
    // الجدد (85%)
    { name: "Los Candies", money: [334, 391, 253, 230, 196, 138, 92, 35, 23] },
    { name: "La Secret Combinasion", money: [2000, 625, 125] },
    { name: "Esok Sekolah", money: [720, 450, 300, 255, 240, 218, 210, 188, 180, 128, 120, 105, 98, 38, 30] },
    { name: "Mieteteira Bicicleteira", money: [403, 364, 260, 234, 195, 182, 156, 130, 104, 78, 33, 32, 30, 26] },
    { name: "Spaghetti Tualetti", money: [600, 510, 375, 360, 300, 195, 180, 90, 75, 60] },
    { name: "La Spooky Grande", money: [533, 392] },
    { name: "Los Spaghettis", money: [1100, 525, 420] },
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
    { name: "Los 25", money: [205, 163, 135, 130, 120, 113, 110, 100, 85, 83, 75, 62.5, 60, 45, 40, 23, 15, 10] },
    { name: "Quesadilla Crocodila", money: [61, 51, 50, 42, 41, 39, 37, 35, 32, 31, 27, 26, 24, 23, 18, 15, 14, 12] },
    { name: "Triplito Tralaleritos", money: [23, 18, 17, 14, 13, 12, 11] },
    { name: "Money Money Puggy", money: [273, 231, 221, 210, 137, 131, 126, 110, 105, 95, 84, 63, 38, 32, 26, 21] },
    { name: "Los Burritos", money: [191, 149, 128, 125, 123, 115, 113, 102, 87, 81, 60] },
    { name: "Tung Tung Tung Sahur", money: [13] },
    { name: "Eviledon", money: [189, 173, 32] },
    { name: "Chimnino", money: [242, 200, 168, 161, 147, 144, 140, 119, 112, 102, 98, 84, 70, 42, 35, 21, 18, 14] },
    { name: "Celularcini Viciosini", money: [303.7, 270] },
    { name: "La Extinct Grande", money: [153] },
    { name: "Reinito Sleighito", money: [140] },
    { name: "Strawberry Elephant", money: [550] },
    { name: "Fragrama and Chocrama", money: [2400, 1800] },
    { name: "Las Sis", money: [227.5] },
    { name: "Orcaledon", money: [160] },
    { name: "Dragon Gingerini", money: [300] },
    { name: "Burguro And Fryuro", money: [1200] },
    { name: "Lavadorito Spinito", money: [405, 146.2, 135] },
    { name: "Mariachi Corazoni", money: [125, 87.5] },
    // الـ gods (2%)
    { name: "Garama and Madundung", money: [1400, 750, 400] },
    { name: "Meowl", money: [450] },
    { name: "Cooki and Milki", money: [2500, 155] },
    { name: "Los Primos", money: [1100] },
    { name: "Swaggy Bros", money: [1400] },
    { name: "Spooky and Pumpky", money: [1000] },
    { name: "La Secret Combinasion", money: [2000] },
    { name: "Capitano Moby", money: [1900] },
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
    { name: "Los Puggies", money: [270, 241, 188, 180, 420] },
    { name: "Quesadillo Vampiro", money: [46, 32, 18] },
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
    { name: "La Cucaracha", money: [14] }
];

// خريطة الصور محدثة بكل الجديد
const images = {
    "Quesadilla Crocodila": "https://static.wikia.nocookie.net/stealabr/images/3/3f/QuesadillaCrocodilla.png/revision/latest?cb=20251006143118",
    "Mariachi Corazoni": "https://static.wikia.nocookie.net/stealabr/images/5/5a/MariachiCora.png/revision/latest?cb=20251006211910",
    "La Extinct Grande": "https://static.wikia.nocookie.net/stealabr/images/c/cd/La_Extinct_Grande.png/revision/latest?cb=20250914041757",
    "La Taco Combinasion": "https://static.wikia.nocookie.net/stealabr/images/8/84/Latacocombi.png/revision/latest?cb=20251030015001",
    "Quesadillo Vampiro": "https://static.wikia.nocookie.net/stealabr/images/0/0e/VampiroQuesa.png/revision/latest?cb=20251129212633",
    "Chillin Chili": "https://static.wikia.nocookie.net/stealabr/images/e/e0/Chilin.png/revision/latest?cb=20251223061757",
    "Esok Sekolah": "https://static.wikia.nocookie.net/stealabr/images/2/2a/EsokSekolah2.png/revision/latest?cb=20250819001020",
    "Telemorte": "https://static.wikia.nocookie.net/stealabr/images/2/20/Telemorte.png/revision/latest?cb=20251030015504",
    "Swag Soda": "https://static.wikia.nocookie.net/stealabr/images/9/9f/Swag_Soda.png/revision/latest?cb=20251116003702",
    "Los Burritos": "https://static.wikia.nocookie.net/stealabr/images/9/97/LosBurritos.png/revision/latest?cb=20251123123907",
    "Los Nooo My Hotspotsitos": "https://static.wikia.nocookie.net/stealabr/images/c/cb/LosNooMyHotspotsitos.png/revision/latest?cb=20250903124000",
    "Spaghetti Tualetti": "https://static.wikia.nocookie.net/stealabr/images/b/b8/Spaghettitualetti.png/revision/latest?cb=20251122142032",
    "Gobblino Uniciclino": "https://static.wikia.nocookie.net/stealabr/images/c/c5/Gobblino_Uniciclino.png/revision/latest?cb=20251126164826",
    "Naughty Naughty": "https://static.wikia.nocookie.net/stealabr/images/1/13/Sought_the_naught.png/revision/latest?cb=20251213213636",
    "Los Combinasionas": "https://static.wikia.nocookie.net/stealabr/images/3/36/Stop_taking_my_chips_im_just_a_baybeh.png/revision/latest?cb=20250909223756",
    "Noo my Present": "https://static.wikia.nocookie.net/stealabr/images/3/35/Noo_my_Present.png/revision/latest?cb=20251219224536",
    "Tung Tung Tung Sahur": "https://static.wikia.nocookie.net/stealabr/images/e/e3/Tung_Tung_Tung_Sahur.png/revision/latest?cb=20251211154446",
    "Burrito Bandito": "https://static.wikia.nocookie.net/stealabr/images/e/e6/PoTaTo.png/revision/latest?cb=20251022160548",
    "Los Cucarachas": "https://static.wikia.nocookie.net/stealabr/images/a/ac/Los_Cucarachas_no_effect.png/revision/latest?cb=20251125124717",
    "Bandito Bobritto": "https://static.wikia.nocookie.net/stealabr/images/5/57/Messi.png/revision/latest?cb=20250902175959",
    // اللي قبل (للتكملة)
    "Money Money Puggy": "https://images-ext-1.discordapp.net/external/ax7-d3xgZ_0sTF4dctsYRiMlrMv1ZcbvjEF1g9oyi8s/https/static.wikia.nocookie.net/stealabr/images/0/09/Money_money_puggy.png?format=webp&quality=lossless&width=663&height=663",
    "Swaggy Bros": "https://media.discordapp.net/attachments/1449486788128280838/1452519895639265291/1000.png",
    "Nuclearo Dinossauro": "https://media.discordapp.net/attachments/1449486788128280838/1452521421501759689/latest.png",
    "Los Puggies": "https://images-ext-1.discordapp.net/external/j_0wsAqLq7_CbwxnvNjy9a9WehIqfndX_QNvB6ZKvbY/https/static.wikia.nocookie.net/stealabr/images/c/c8/LosPuggies2.png?format=webp&quality=lossless&width=400&height=221",
    "Ketchuru and Musturu": "https://images-ext-1.discordapp.net/external/XHLqayNJgkcfc9GT9UWQTYagl1rzCQfVoD2X7wQzpsk/https/static.wikia.nocookie.net/stealabr/images/1/14/Ketchuru.png?format=webp&quality=lossless&width=384&height=389",
    "La Secret Combinasion": "https://images-ext-1.discordapp.net/external/y3saBAMC-CIBBvvXKfiK4ryRNDoAlXPhksQ7TEWHvJQ/https/static.wikia.nocookie.net/stealabr/images/f/f2/Lasecretcombinasion.png?format=webp&quality=lossless&width=287&height=380",
    "Ketupat Kepat": "https://images-ext-1.discordapp.net/external/5OkE7b5lV810PFVtyb3mAnoM1TcKzEwleZRBcbTbyTs/https/static.wikia.nocookie.net/stealabr/images/a/ac/KetupatKepat.png?format=webp&quality=lossless&width=350&height=329",
    "Capitano Moby": "https://images-ext-1.discordapp.net/external/2I6DV_gx6ZgCyndi1r1WN6BuXZmV6DtibLcz5F0usH4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Moby.png?format=webp&quality=lossless&width=425&height=403",
    "Tang Tang Keletang": "https://images-ext-1.discordapp.net/external/zh1JnR754cZz4jSroK1XdT3ZnxSY9V_RC0RP44nAakM/https/static.wikia.nocookie.net/stealabr/images/c/ce/TangTangVfx.png?format=webp&quality=lossless&width=53&height=53",
    "Fragrama and Chocrama": "https://images-ext-1.discordapp.net/external/bB9o2FpwBFjMybD5edtAzOjHRAZF8LS3Nl3q3TIkW5Y/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Fragrama.png?format=webp&quality=lossless&width=361&height=315",
    "Burguro And Fryuro": "https://images-ext-1.discordapp.net/external/jsvneFUiTH2VoZAZA3DfH9bsdn_XCNHp4UV6JNoYhY4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Burguro-And-Fryuro.png?format=webp&quality=lossless&width=46&height=53",
    "Tictac Sahur": "https://images-ext-1.discordapp.net/external/bS0KoEdqG6X_0qSIbFq_u1hwOyifrPIXOB8llt89Qrw/https/static.wikia.nocookie.net/stealabr/images/6/6f/Time_moving_slow.png?format=webp&quality=lossless&width=266&height=272",
    "Los Mobilis": "https://images-ext-1.discordapp.net/external/an7Mz8RuoPNXhGXfAb5ha30cq1dpFtAuY0kt_vzhcNs/https/static.wikia.nocookie.net/stealabr/images/2/27/Losmobil.png?format=webp&quality=lossless&width=300&height=399",
    "Lavadorito Spinito": "https://images-ext-1.discordapp.net/external/xWDGbsqd2vgfkI5txdKJ0_1WI8AxulLec-BcQnodpno/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Lavadorito_Spinito.png?format=webp&quality=lossless&width=195&height=288",
    "Los 25": "https://images-ext-1.discordapp.net/external/sOqMoNVTjY0GFdQ1zvkZbG0INMe31afoRPGGz5zyhco/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Transparent_Los_25.png?format=webp&quality=lossless&width=312&height=192",
    "Celularcini Viciosini": "https://images-ext-1.discordapp.net/external/49Ht7wzcOh-MvsodEReoRtorreMi25w6oKROg9XxUJ8/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/DO_NOT_GRAB_MY_PHONE%21%21%21.png?format=webp&quality=lossless&width=121&height=183",
    "La Spooky Grande": "https://images-ext-1.discordapp.net/external/qLIQ6_AgS5iKGs7FdqHj6yI-a5b5mOBAEpHkIygllKY/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Spooky_Grande.png?format=webp&quality=lossless&width=300&height=399",
    "Las Sis": "https://images-ext-1.discordapp.net/external/5r1IuuVG9vvy2VQOktc_vtxFATC7-ZF6cULJStJ-oA4/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Las_Sis.png?format=webp&quality=lossless&width=346&height=384",
    "Orcaledon": "https://images-ext-1.discordapp.net/external/ZKPjPvdO2j67H78cgwoChVoXYZ-LuAKQS8ajP014TAI/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Orcaledon.png?format=webp&quality=lossless&width=482&height=360",
    "Cooki and Milki": "https://images-ext-1.discordapp.net/external/YdY9ttiYHXOgIEHgzdVE-nJE0cB9appgOWZw_k4czmk/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Cooki_and_milki.png?format=webp&quality=lossless&width=392&height=281",
    "Los Spaghettis": "https://images-ext-1.discordapp.net/external/eg0sVn3mRGkY_CwTBbxw_TPjKVBxFnqlioyKPetvBTc/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/LosSpaghettis.png?format=webp&quality=lossless&width=412&height=285",
    "Dragon Gingerini": "https://images-ext-1.discordapp.net/external/TNu9-fYxVWhYeuGAeGxzThV2A7zqPSO-Da8sZoI9q68/https/stealabrainrot.fandom.com/wiki/Special%3AFilePath/Gingerbread_Dragon_Leak.png?format=webp&quality=lossless&width=217&height=237"
};

const normal_new_animals = animals.slice(0, 35);
const god_animals = animals.slice(35, 42);
const old_animals = animals.slice(42);

const purple_color = 0x9B59B6;

const emojis = [
    "<:1403471635515703487:1454219094470692996>"
];

let last_animal_name = null;

function generate_others(main_money_value) {
    const num = [0, 1, 4, 5][Math.floor(Math.random() * 4)];
    const others = [];
    const others_animals = [];
    for (let i = 0; i < num; i++) {
        let animal, money_val;
        const r = Math.random();
        if (r < 0.05) {
            animal = god_animals[Math.floor(Math.random() * god_animals.length)];
        } else if (r < 0.65) {
            const low_animals = animals.filter(a => a.money.some(m => m < 100));
            animal = low_animals[Math.floor(Math.random() * low_animals.length)];
        } else {
            animal = animals[Math.floor(Math.random() * animals.length)];
        }
        const possible = animal.money.filter(m => m < main_money_value);
        money_val = possible.length > 0 ? possible[Math.floor(Math.random() * possible.length)] : Math.floor(main_money_value / 2) || 10;
        others.push(`${animal.name}: $${money_val}M/s`);
        others_animals.push({name: animal.name, val: money_val});
    }
    return {text: others.join('\n') || '', animals: others_animals};
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
    const others_obj = generate_others(main_money_val);
    const others = others_obj.text;
    const others_animals = others_obj.animals;
    const random_emoji = emojis[Math.floor(Math.random() * emojis.length)];

    const embed = {
        title: `${random_emoji} Akundisco Notifier | Priority ${random_emoji} `,
        color: purple_color,
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

    // الصورة للرئيسي دائمًا
    if (images[animal.name]) {
        embed.thumbnail = { url: images[animal.name] };
    } else if (others_animals.length > 0) {
        others_animals.sort((a, b) => b.val - a.val);
        const highest_other = others_animals[0];
        if (images[highest_other.name]) {
            embed.thumbnail = { url: images[highest_other.name] };
        }
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
