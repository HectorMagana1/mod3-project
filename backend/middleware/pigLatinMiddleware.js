// Convert to PigLatin:
// Find the first vowel.
// If first vowel is first letter, add "way" to the end.
// Otherwise, if the word starts with a consonant,
// move sequential consonant group to the end,
// then add "ay" to the end.
// If the word contains no vowels, return the word as is.
// ISSUES: Considers punctuation part of the word.
const convertToPigLatinWord = function(word)
{
  // Get vowels and PigLatin Keywords.
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',];
  const punctuation = [';', ':', ',', '.'];
  const firstVowelEnding = "way";
  const firstConsonantEnding = "ay";
  // Ensure the word is lowercase
  // word = word.toLowerCase();
  const endingPunctuation = punctuation.filter((character) =>
    {
      return word.endsWith(character);
    }
  );
  // console.log(`Ending punctuation: ${endingPunctuation}`);
  // Remove ending punctuation before processing.
  word = word.replace(endingPunctuation, "");
  // Find the first vowel.
  const firstVowelIndex = word.split('').findIndex(letter =>
    {
      return vowels.includes(letter);
    }
  );

  // Actual conversion.
  // If first vowel is first letter, add "way" to the end.
  if (firstVowelIndex === 0)
  {
    return word + firstVowelEnding + endingPunctuation;
  }
  // Otherwise, if the word starts with a consonant,
  else if (firstVowelIndex > 0)
  {
    // move sequential consonant group to the end,
    const prefix = word.slice(0, firstVowelIndex);
    const suffix = word.slice(firstVowelIndex);
    // then add "ay" to the end.
    return suffix + prefix + firstConsonantEnding + endingPunctuation;
  }
  // If the word contains no vowels, return the word as is.
  else { return word; }
};

const convertWordFromPigLatin = function(word)
{
  return null;
};

const convertToPigLatin = function(text)
{
  return text.split(' ').map((word) =>
    {
      return convertToPigLatinWord(word);
    }
  ).join(' ');
};

const convertFromPigLatin = function(text)
{
  return null;
};


const pigLatinMiddleware = function(req, res, next)
{
  console.log('Converting to PigLatin...')

  try
  {
    const pigLatinText = convertToPigLatin(req.body.text);
    // Attach the payload from the token to the request object (req)
    // req.id = payload.id;  // req.username = payload.username
    req.body.text = pigLatinText;
    // Move on to the requested route (next)
    next()
  }
  catch(err)
  {
    if (false)
    {
        return res.status(403).json({ error: 'No token provided'})
    }
    if (false)
    {
        return res.status(403).json({ error: payload.error })
    }

    console.log(err.message)
    res.status(403).json({ error: err.message })
  }
}


module.exports =
  {
    pigLatinMiddleware,
  };
