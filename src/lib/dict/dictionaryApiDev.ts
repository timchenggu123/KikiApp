const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/"

// [
//   {
//     "word": "hello",
//     "phonetic": "həˈləʊ",
//     "phonetics": [
//       {
//         "text": "həˈləʊ",
//         "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
//       },
//       {
//         "text": "hɛˈləʊ"
//       }
//     ],
//     "origin": "early 19th century: variant of earlier hollo ; related to holla.",
//     "meanings": [
//       {
//         "partOfSpeech": "exclamation",
//         "definitions": [
//           {
//             "definition" "used as a greeting or to begin a phone conversation.",
//             "example": "hello there, Katie!",
//             "synonyms": [],
//             "antonyms": []
//           }
//         ]
//       },
//       {
//         "partOfSpeech": "noun",
//         "definitions": [
//           {
//             "definition": "an utterance of ‘hello’; a greeting.",
//             "example": "she was getting polite nods and hellos from people",
//             "synonyms": [],
//             "antonyms": []
//           }
//         ]
//       },
//       {
//         "partOfSpeech": "verb",
//         "definitions": [
//           {
//             "definition": "say or shout ‘hello’.",
//             "example": "I pressed the phone button and helloed",
//             "synonyms": [],
//             "antonyms": []
//           }
//         ]
//       }
//     ]
//   }
// ]

export function parseRaw(input: any) {
  let raw = input[0];
  let word = raw.word;
  let origin = raw.origin;
  let phonetic = parsePhonetics(raw).text;
  let audio = parsePhonetics(raw).audio;
  let meanings = raw.meanings.map((meaning: any) => {
    let partOfSpeech = meaning.partOfSpeech;
    let definitions = meaning.definitions.map((definition: any) => {
      let definition_text = definition.definition;
      let example = definition.example;
      return {definition: definition_text, example: example};
    });
    return `${partOfSpeech}: ${definitions.map((d: any) => d.definition).join(', ')}`;
  });
  return {word, origin, phonetic, meanings, audio};
}

export async function asyncQueryWordRaw(word: string) {
  const response = await fetch(DICTIONARY_API + word);
  return response.json();
}

function parsePhonetics(raw: any){
  let uk_audio = null;
  let uk_text = null;
  let us_audio = null;
  let us_text = null;
  let other_audio = null;
  let other_text = null;
  for (let phonetic of raw.phonetics){
    let text = phonetic.text;
    let audio = phonetic.audio;
    if (!audio){
      continue;
    }
    if(audio.endsWith('uk.mp3')){
      uk_text = text;
      uk_audio = audio;
      return {audio: uk_audio, text: uk_text};
    }
    if (audio.endsWith('us.mp3')){
      us_text = text;
      us_audio = audio;
      return {audio: us_audio, text: us_text};
    }
    other_text = text;
    other_audio = audio;
    return {audio: other_audio, text: other_text};
  }
  return {audio: null, text: raw.phonetic};
}
