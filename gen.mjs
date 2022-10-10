#!/usr/bin/env zx

import inquirer from 'inquirer';
import { $,fetch,fs,chalk,cd} from "zx";
import { fileURLToPath } from 'url';
import { dirname,join,resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const promptList = [
    {
        type: 'input',
        message: 'set Project name',
        name: 'projectName',
        default: "node-typescript-default-project"
    },
    {
        type: 'input',
        message: 'set author name',
        name: 'authorName',
        default: "musk"
    },
    {
        type: 'list',
        message: 'Whether to use pm2 or nodemon',
        name: 'tools',
        choices: [
            "pm2",
            "nodemon",
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
];

inquirer.prompt(promptList).then((answers) => {
  console.log(answers)
  genhandle(answers)
})

async function genhandle(answers){
    await $ `echo Start creating a folder ... ${answers.projectName}`;
    await $`test -e ${answers.projectName} && echo "has exist!" ||  mkdir -p ${answers.projectName}`;
    await $ `echo success`;

    await $ `echo Start generate file...`;

    const copyFrom = __dirname;
    const copyRes = (await $ `pwd`).toString();
    const copyTo = "/Users/qiududu/workspace/node-typescript-default-project";

    console.log("from=",copyFrom);
    console.log(copyTo);
    try {
        fs.copy(copyFrom, copyTo, {
            overwrite:true,
            filter: function (path) {
             console.log("path",path);
              if(path.indexOf('node_modules') == -1) return true;
              return false;
            }
        }, err => {
            if (err) return console.error(err)
            console.log('success!')
          })
    } catch (err) {
        console.error(err)
    }

}