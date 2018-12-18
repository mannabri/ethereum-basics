var Random = artifacts.require('./Random.sol');
// Define rounds for generating random numbers serveral times
var rounds = 3;

contract('Random', async () => {

    it('should generate a random number between 0 and 1', async () => {
        let random = await Random.deployed();
        // Repeat check several times
        for (var i = 1; i <= rounds; i++) {
            await random.generateRandomNumber(2);
            let number = await random.randomNumber();
            console.log('Random number:', number.toNumber())
            assert(
                number.toNumber() == 0 || number.toNumber() == 1,
                'random number is not 0 or 1'
            );
        }
    });

    it('should generate a random number between 0 and 10', async () => {
        let random = await Random.deployed();
        let distribution = 10
        // Repeat check several times
        for (var i = 1; i <= rounds; i++) {
            await random.generateRandomNumber(distribution);
            let number = await random.randomNumber();
            console.log('Random number:', number.toNumber())
            assert(
                0 <= number.toNumber() <= (distribution - 1) && (number.toNumber() % 1) == 0,
                ' random number is an integer between 0 and 10'
            )
        }
    });

    it('should generate a random number between 0 and 2018', async () => {
        let random = await Random.deployed();
        let distribution = 2018
        // Repeat check several times
        for (var i = 1; i <= rounds; i++) {
            await random.generateRandomNumber(distribution);
            let number = await random.randomNumber();
            console.log('Random number:', number.toNumber())
            assert(
                0 <= number.toNumber() <= (distribution - 1) && (number.toNumber() % 1) == 0,
                ' random number is an integer between 0 and 2018'
            )
        }
    });
});
