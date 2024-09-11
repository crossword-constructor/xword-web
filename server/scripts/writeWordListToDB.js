import fs from 'fs'
import readline from 'readline'

import { WordList, Word, Car } from '../sequelizeModels'

const writeToDb = async () => {
  const fileStream = fs.createReadStream('./server/scripts/xwordlist.txt')
  const wordList = await WordList.create({
    name: 'xwordlist'
  }, { raw: true })
  const cars = await Car.findAll({})
  console.log({cars})
  // const rl = readline.createInterface({
  //   input: fileStream,
  //   crlfDelay: Infinity
  // })

  // rl.on('line', async (line) => {
  //   const [text, score ] = line.split(";")
  //   Word.create({
  //     text: line.split(";")[0],
  //     score: line.split(";")[1],
  //     wordListId: wordList.id
  //   })
    // const resp = await Word.findAll({})
    // resp.forEach(re =>  console.log(re.dataValues))
    // console.log({text, score})
  // })
}

export default writeToDb;