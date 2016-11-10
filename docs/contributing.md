# Contributing
Pull requests are always welcome. Please be sure to read through this entire guide before opening up a pull request.

**We also highly recommend reading the [Technical Overview]('./overview.md') of this project before contributing.**

## Testing
Tests are absolutely required for pull requests. We have several examples of unit and E2E tests throughout the project that can be found in the same directory as each Angular module (e.g. `/src/app/dashboard.e2e.ts`). As stated in the `README.md`, you can run tests as follows:

### Run Tests
```
npm run test
```

### Watch and Run Tests
```
npm run watch:test
```

## Design & Styling
We are using PatternFly, but have had to make many custom overrides to it which can be found in `/src/assets/scss/_overrides.scss`.

- [PatternFly Color Palette](https://www.patternfly.org/styles/color-palette/#_)

