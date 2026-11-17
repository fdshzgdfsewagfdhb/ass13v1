//import fs from 'fs';
//import path from 'path';
//import matter from 'gray-matter';
//import { remark } from 'remark';
//import html from 'remark-html';
import got from 'got';

//const postsDirectory = path.join(process.cwd(), 'posts');
const dataURL = "https://dev-human-readable-name.pantheonsite.io/wp-json/twentytwentytwo-child/v1/latest-posts/1";

// or getSortedList
export async function getSortedPostsData() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    //jsonString.body = [];
    console.log(error);
  }
  
  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // sort json array by name property
  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      title: item.post_title,
      date: item.post_date
    }
  });
}

// or getAllIds
export async function getAllPostIds() {
 // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');
   // console.log("test");

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    //console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
  //console.log("test");
  //console.log(jsonObj);
  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
  // above code returns an array with nested obj values that looks like this:
  // [
  //   {
  //     params: {
  //       id: 3
  //     }
  //   },
  //   {
  //     params: {
  //       id: 2
  //     }
  //   }
  // ]
}

// or getData
export async function getPostData(idRequested) {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    //console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
    // console.log("objReturned");
    console.log(objReturned);
  } else {
    objReturned = {};
  }
  // console.log(objReturned);

  // return object value found
  return objReturned;
}