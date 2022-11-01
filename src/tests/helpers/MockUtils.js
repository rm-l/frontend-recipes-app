import {
  DRINK_ALCOHOLIC_OR_NOT,
  DRINK_AREA,
  DRINK_CATEGORY,
  DRINK_IMAGE,
  DRINK_NAME,
  DRINK_TAGS,
  MEAL_ALCOHOLIC_OR_NOT,
  MEAL_AREA,
  MEAL_CATEGORY,
  MEAL_IMAGE,
  MEAL_NAME,
  MEAL_TAGS,
} from './InformationTest';

export const MOCK_DONE_RECIPE = [
  {
    id: '52771',
    type: 'meal',
    nationality: MEAL_AREA,
    category: MEAL_CATEGORY,
    alcoholicOrNot: MEAL_ALCOHOLIC_OR_NOT,
    name: MEAL_NAME,
    image: MEAL_IMAGE,
    doneDate: '23/06/2020',
    tags: MEAL_TAGS,
  },
  {
    id: '15997',
    type: 'drink',
    nationality: DRINK_AREA,
    category: DRINK_NAME,
    alcoholicOrNot: DRINK_ALCOHOLIC_OR_NOT,
    name: DRINK_NAME,
    image: DRINK_IMAGE,
    doneDate: '23/06/2020',
    tags: DRINK_TAGS,
  },
];

export const MOCK_FAVORITE_RECIPE_MEAL_BEFORE = [
  {
    id: '52771',
    type: 'meal',
    nationality: MEAL_AREA,
    category: MEAL_CATEGORY,
    alcoholicOrNot: MEAL_ALCOHOLIC_OR_NOT,
    name: MEAL_NAME,
    image: MEAL_IMAGE,
    doneDate: '',
    tags: MEAL_TAGS,
  },
];

export const MOCK_FAVORITE_RECIPE_MEAL_AFTER = [];

export const MOCK_FAVORITE_RECIPE_DRINK_BEFORE = [];

export const MOCK_FAVORITE_RECIPE_DRINK_AFTER = [
  {
    id: '15997',
    type: 'drink',
    nationality: DRINK_AREA,
    category: DRINK_CATEGORY,
    alcoholicOrNot: DRINK_ALCOHOLIC_OR_NOT,
    name: DRINK_NAME,
    image: DRINK_IMAGE,
  },
];

export const MOCK_FAVORITE_RECIPE_ALL = [
  {
    id: '15997',
    type: 'drink',
    nationality: DRINK_AREA,
    category: DRINK_CATEGORY,
    alcoholicOrNot: DRINK_ALCOHOLIC_OR_NOT,
    name: DRINK_NAME,
    image: DRINK_IMAGE,
  },
  {
    id: '52771',
    type: 'meal',
    nationality: MEAL_AREA,
    category: MEAL_CATEGORY,
    alcoholicOrNot: MEAL_ALCOHOLIC_OR_NOT,
    name: MEAL_NAME,
    image: MEAL_IMAGE,
    doneDate: '',
    tags: MEAL_TAGS,
  },
];

export const MOCK_FAVORITE_RECIPE_ALL_AFTER = [
  {
    id: '15997',
    type: 'drink',
    nationality: DRINK_AREA,
    category: DRINK_CATEGORY,
    alcoholicOrNot: DRINK_ALCOHOLIC_OR_NOT,
    name: DRINK_NAME,
    image: DRINK_IMAGE,
  },
];

export const MOCK_IN_PROGRESS_RECIPE = {
  drinks: {
    15997: [],
  },
  meals: {
    52771: [],
  },
};
