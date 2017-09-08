/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';

import constants from '../config/constants';

const ConditionTypes = [
  'rainy',
  'stormy',
  'sunny',
  'cloudy',
  'hot',
  'cold',
  'dry',
  'wet',
  'windy',
  'hurricanes',
  'typhoons',
  'sandstorms',
  'snowstorms',
  'tornados',
  'humid',
  'foggy',
  'snow',
  'thundersnow',
  'hail',
  'sleet',
  'drought',
  'wildfire',
  'blizzard',
  'avalanche',
  'mist',
];

const TitleTypes = [
  `Fucking love is in the air`,
  `It's fucking raining`,
  `It's fucking cloudy`,
  `Freezing cold fucking cold`,
  `It's fucking nice out`,
  `Holy fucking snow batman`,
  `It's feeling like a good God damn day`,
  `Freezing fucking serious`,
  `It's like a God damn oven`,
  `It's just fucking grey out`,
  `Can't see because fucking snow`,
  `Fucking Amaze Balls`,
  `Fucking melting bruh`,
  `It's so fucking hot`,
  `Let's get fucking naked`,
  `Global mother fucking warming`,
  `It's fucking tropical out bruh`,
  `It's too God damn hot`,
  `It's fucking BBQ time outside`,
  `Bring your fucking umbrella`,
  `Fucking thunder storm`,
  `It's getting fucking dark brosef`,
  `It's stupid hot out`,
  `It's fucking whiskey time`,
  `Frozen fucking weather`,
  `Negative fucking zero`,
  `Cold as fucking shit`,
  `It's getting fucking chilly`,
  `Frozen fucking fingers`,
  `Frost fucking bite`,
  'Icebergs all over your shit',
  `It's fucking arctic`,
  `Hypo fucking thermic`,
  `Brezzy fucking wheezey out`,
  `It's foggy as a mother fucker`,
  `It's windy as shit`,
  `Totally not shitty outside`,
  `Fucking okay outside I guess`,
  `It's fucking freezing bruh`,
  `It's a tid bit nipply`,
  `It's frosty as fuck`,
  `It's raining cats and dogs and shit`,
  `Wear fucking sun glasses`,
  `Gonna fuckin' fry today`,
  `Meh just stay in bed`,
  `It’s a meh kinda day`,
];

const SublineTypes = [
  `Take off your shirt and get wet.`,
  `You can look outside to get more information.`,
  `Take off your shirt but leave on dem panties.`,
  `Do you wanna build a snowman? Fuck you`,
  `Not amazeballs but also not fucking shitty.`,
  `You can't look outside because of fucking snow.`,
  `Just get naked, now. Also, ice cream. DO IT!`,
  `Just clouds. God is dead. Be lazy.`,
  `So fucking nice outside, holy fuck totes.`,
  `Take off your shirt and get wet.`,
  `It's going to be hot as shit.`,
  `Yeah, let's blame Global Warming.`,
  `Shitloads of rain is awaiting you.`,
  `Fucking grey clouds everywhere. Seriously?`,
  `Where's the liqour at?`,
  `Snow. Every where. Stay Frosty people.`,
  `Unpack the space heater. Savage kinda cold.`,
  `The South. It's warm. You're not. Fuck everything.`,
  `This is what drives us to drink.`,
  `Can't feel my fucking fingers any more.`,
  `Because it's freezing. You get the point.`,
  `This is for you my Scottish friends.`,
  `Sunglasses and advil. Last night was mad real.`,
  `Dude just stay in bed.`,
  `But you can change it with a smile :) Or drugs.`,
];

const ColorTypes = [
  '#FF0060',
  '#007EFF',
  '#004A96',
  '#FF0000',
  '#FFC600',
  '#FFFFFF',
  '#FF0F66',
  '#9F9F9F',
];

const titleIncludesHighlightedTxtValidationHandler = highlight => TitleTypes.includes(highlight)
    ? highlight
    : new Error('Phrase title does not contain hightlighted text').message;

const PhraseSchema = new Schema(
  {
    temperature: {
      type: Number,
      trim: true,
    },
    condition: {
      type: String,
      trim: true,
      enum: ConditionTypes,
    },
    title: {
      type: String,
      trim: true,
      enum: TitleTypes,
    },
    highlight: {
      type: String,
      trim: true,
      validate: titleIncludesHighlightedTxtValidationHandler,
    },
    color: {
      type: String,
      trim: true,
      enum: ColorTypes,
      default: '#FF0060',
    },
    subline: {
      type: String,
      trim: true,
      enum: SublineTypes,
    },
  },
  {
    timestamps: true,
  },
);

let Phrase;
try {
  Phrase = mongoose.model('Phrase');
} catch (e) {
  Phrase = mongoose.model('Phrase', PhraseSchema);
}

export default Phrase;
