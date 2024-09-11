/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    setupFilesAfterEnv: ['./src/__test__/test.setup.ts'],
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
};
