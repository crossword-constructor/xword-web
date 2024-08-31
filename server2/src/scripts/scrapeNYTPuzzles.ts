// const cheerio = require("cheerio");
// const axios = require("axios");
// const mongoose = require("mongoose");
// const Clue = require("./Clue");
// const Answer = require("./Answer");
// const Puzzle = require("./Puzzle");
// const moment = require("moment");
import * as cheerio from 'cheerio'
import axios from 'axios'
import { getDatabaseConfig } from '../db/dbConfig'
import { PuzzleModel } from '../models/PuzzleModel'
import { Cell } from '../typeDefs/Puzzle'
import { ClueAnswerInput } from '../typeDefs/Puzzle'
import { ClueModel } from '../models/ClueModel'
import { ClueAnswerModel } from '../models/ClueAnswerModel'
import { AnswerModel } from '../models/AnswerModel'
import { ClueJSON, AnswerJSON } from '../db/JSONtypes'

// @TODO
// 1. Add puzzle ids to clues and answers
// 2. Add clue-answer pair to puzzle
// 3. Save cell number on board obj
// newPuzzle.clues.push({clue: clue.id, answer: answer.id, position: clues[i].position})

// @DEBUG
let prevDate
let avg = 0
let total = 0
let counter = 0

const scrapeAll = false
const startDate = process.argv[3] ?? '2/5/2019'
getDatabaseConfig()

export async function scrape(urlExtension: string) {
  let nextLink: string | undefined
  const res = await axios.get(`https://www.xwordinfo.com/${urlExtension}`)
  let $ = cheerio.load(res.data)
  let found = false
  $('.dtlink').each(function (index) {
    if ($(this).text() === 'Next puzzle' && !found) {
      nextLink = $(this).attr('href')
      found = true
    }
  })
  const newPuzzle = await createPuzzle($, urlExtension)
  if (!newPuzzle) {
    console.warn(`A puzzle with the link: ${urlExtension} already exists`)
    if (nextLink) {
      return scrapeNextPuzzle(nextLink)
    }
    return
  }
  const clues = scrapeClues($)
  const createdClues = await createClues(clues)
  const createdAnswers = await createAnswers(clues)
  await createClueAnswerPairs(
    clues,
    createdClues.map((clue) => clue.id),
    createdAnswers.map((answer) => answer.id),
    newPuzzle.id
  )
  console.log(
    `Success, scraped puzzle: ${newPuzzle.date} from https://www.xwordinfo.com/${urlExtension}`
  )
  if (nextLink) {
    return scrapeNextPuzzle(nextLink)
  }
  console.log('no NEXT LINK')
  return true
}

function scrapeNextPuzzle(nextLink: string) {
  if (scrapeAll) {
    console.log({ nextLink })
    scrape(nextLink)
  } else {
    return true
    // process.exit(0)
  }
}

function parseClue(element: any, direction: string): ClueAnswerInput {
  // console.log(element);
  let clueString = element.text()
  // let position = `${clueString.slice(0, clueString.indexOf("."))}${direction}`;
  let position = `${element.prev().html()}${direction}`
  let word = element.children().first().html()
  clueString = clueString.slice(0, clueString.indexOf(word) - 2).trim()
  return { clue: clueString, answer: word, position: position }
}

async function createPuzzle($: any, urlExtension: string) {
  const puzzleModel = new PuzzleModel()
  // check if puzzle exists first
  const title = $('#PuzTitle').text()
  const date = urlExtension.slice(urlExtension.indexOf('=') + 1)
  const existingPuzzle = await puzzleModel.findOne({ title, date })
  if (existingPuzzle) {
    return
  }
  const puzzle = {
    title,
    date,
    publisher: 'New York Times',
    editor: $('.aegrid :nth-child(4)').text(),
    // author: $('#CPHContent_AEGrid :nth-child(2)').html(),
    width: $('#PuzTable').children().children().length,
    board: JSON.stringify(scrapeBoard($)),
  }
  const puzzleResult = await puzzleModel.createPuzzle(puzzle)
  return puzzleResult
}

function scrapeBoard($: any): Cell[] {
  const board: Cell[][] = []
  let puzzle = $('#PuzTable').children().first()
  puzzle.children().each(function (this: any, index: number, el: any) {
    let newRow: Array<Cell> = []
    $(this)
      .children()
      .each(function (this: any, subIndex: number, subEl: any) {
        if ($(this).hasClass('black')) {
          newRow.push({ style: '#BS#', text: undefined })
        } else if ($(this).hasClass('bigcircle')) {
          newRow.push({
            style: 'circle',
            text: $(this).children().last().text(),
          })
        } else if ($(this).hasClass('shade')) {
          console.log($(this).attr('style'))
          newRow.push({
            style: `shade: ${
              $(this).attr('style') ?? 'background-color:#c0c0c0;'
            }`,
            text: $(this).children().last().text(),
          })
        } else {
          newRow.push({
            text: $(this).children().last().text(),
            style: undefined,
          })
        }
      })
    board[index] = newRow
  })
  return board.flat()
}

function scrapeClues($: any): ClueAnswerInput[] {
  const clues: ClueAnswerInput[] = []
  $('.numclue').each(function (this: any, index: number, el: any) {
    // console.log(el);
    let direction = $(this).siblings().first().html() === 'Across' ? 'A' : 'D'
    $(this)
      .children()
      .each(function (this: any, i: number, e: any) {
        // console.log("THIS ,", $(this).text())
        if (i % 2 !== 0) {
          let clue = parseClue($(this), direction)
          clues.push(clue)
        }
        // console.log(clue)
      })
  })
  return clues
}

async function createClues(clues: ClueAnswerInput[]): Promise<ClueJSON[]> {
  const clueModel = new ClueModel()
  const results: Array<ClueJSON> = []
  for (let i = 0; i < clues.length; i += 1) {
    const existingClue = await clueModel.findClueByText(clues[i].clue)
    if (existingClue) {
      results.push(existingClue)
    } else {
      console.log('creating clue: ', clues[i].clue)
      const newClue = await clueModel.createClue(clues[i].clue)
      results.push(newClue)
    }
  }
  return results
}

async function createAnswers(clues: ClueAnswerInput[]): Promise<AnswerJSON[]> {
  const answerModel = new AnswerModel()
  const results: Array<AnswerJSON> = []
  for (let i = 0; i < clues.length; i += 1) {
    const existingClue = await answerModel.findAnswerByText(clues[i].clue)
    if (existingClue) {
      results.push(existingClue)
    } else {
      console.log('creating clue: ', clues[i].clue)
      const newClue = await answerModel.createAnswer(clues[i].clue)
      results.push(newClue)
    }
  }
  return results
}

async function createClueAnswerPairs(
  clues: ClueAnswerInput[],
  clueIds: string[],
  answerIds: string[],
  puzzleId: string
) {
  const clueAnswerModel = new ClueAnswerModel()
  const clueAnswerPairs = clues.map((c, i) => ({
    position: c.position,
    clueId: clueIds[i],
    answerId: answerIds[i],
    puzzleId,
  }))
  const results = await clueAnswerModel.bulkCreate(clueAnswerPairs)
  return results
}
