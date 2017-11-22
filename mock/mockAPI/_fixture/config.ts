
export const fixtureConfig: IFixtureConfigModel = {
  APP: {
    PATH: './mock/mockAPI/_fixture/app',
    prefix: 'app',
  },
};

interface IFixtureConfigModel {
  APP: IFixtureModel;
}

interface IFixtureModel {
  PATH: string;
  prefix: string;
}
