const NFT = artifacts.require('./NFT.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('NFT', ([deployer, author, tipper]) => {
  let nft

  before(async () => {
    nft = await NFT.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await nft.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await nft.name()
      assert.equal(name, 'Mint NFT')
    })
  })

  describe('images', async () => {
    let result, imageCount
    const hash = 'abcdef1234'

    before(async () => {
      result = await nft.uploadImage(hash, 'Image description', { from: author })
      imageCount = await nft.imageCount()
    })

  //   //check event
    it('creates images', async () => {
      // SUCESS
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      // console.log(event);
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Image description', 'description is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')


   // FAILURE: Image must have hash
      await nft.uploadImage('', 'Image description', { from: author }).should.be.rejected;

  // FAILURE: Image must have description
      await nft.uploadImage('Image hash', '', { from: author }).should.be.rejected;
    })

  //   //check from Struct
    it('lists images', async () => {
      const image = await nft.images(imageCount)
      console.log(image);
      assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(image.hash, hash, 'Hash is correct')
      assert.equal(image.description, 'Image description', 'description is correct')
      assert.equal(image.tipAmount, '0', 'tip amount is correct')
      assert.equal(image.author, author, 'author is correct')
    })
    })
  })
