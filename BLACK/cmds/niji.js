const Black = {
	name: "نيجيكس",
    Owner: "Gry KJ",
	Time: 3,
	Auth: 0,
	Info: "البوت يتخيل لك  شي",
	Class: "آدوات",
	How: "اكتب شي يتخيلو لك ",
    Hide: false
};

const Replicate = require("replicate");
module.exports = {
	config: Black,
	onType: async function ({ black, event, args }) {
       const bro = args.join(' ');
       const replicate = new Replicate({
        auth: "r8_Jsl94SnX5KIUygbPJKRBEgvdOpQo3Xh449Ebq",
      });
       if (!bro) return black.reply('اكتب شي بعد الامر ヾ(⌐■_■)ノ♪');
       let brop = bro.split('-')
       let query = brop[0];
       let num = brop[1];
       let sus = null;
       if (brop) 
       {
        if (num > 4) return black.reply('لا يمكنك طلب اكثر من 4');
        let queryAfter = await funcs.trgm(query, "en");
        const output = await replicate.run(
            "brewwh/cog-a1111-ui:df9a24c133a05dbd0a292b7fb3393e50fcfcb22ba0025372935e279da31a9da5",
            {
              input: {
                vae: "ema_original.pt",
                seed: -1,
                model: "anythingv.safetensors",
                steps: 15,
                width: 768,
                height: 768,
                prompt: queryAfter,
                hr_scale: 2,
                cfg_scale: 7,
                enable_hr: true,
                batch_size: num,
                hr_upscaler: "R-ESRGAN 4x+ Anime6B",
                sampler_name: "DPM++ 2M Karras",
                negative_prompt: "low quality, bad quality, worst quality",
                denoising_strength: 0.38,
                hr_second_pass_steps: 8
              }
            }
              ); sus = output;
       }
       else {
        const output = await replicate.run(
            "brewwh/cog-a1111-ui:df9a24c133a05dbd0a292b7fb3393e50fcfcb22ba0025372935e279da31a9da5",
            {
              input: {
                vae: "ema_original.pt",
                seed: -1,
                model: "anythingv.safetensors",
                steps: 15,
                width: 768,
                height: 768,
                prompt: bro,
                hr_scale: 2,
                cfg_scale: 7,
                enable_hr: true,
                batch_size: 1,
                hr_upscaler: "R-ESRGAN 4x+ Anime6B",
                sampler_name: "DPM++ 2M Karras",
                negative_prompt: "low quality, bad quality, worst quality, small boobes",
                denoising_strength: 0.38,
                hr_second_pass_steps: 8
              }
            }
              ); sus = output;
       }
       let arr = [];
       for (let sim of sus)
       {
        let r = await funcs.str(sim);
        arr.push(r)
       }
       black.reply({body: "⚝ ◄ تفضل ► ⚝",
       attachment: arr});
    },
        }
