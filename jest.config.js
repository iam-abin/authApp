/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+.ts?$': ['ts-jest', {}],
    },
    setupFilesAfterEnv: ['./src/__test__/test.setup.ts'],
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
};
