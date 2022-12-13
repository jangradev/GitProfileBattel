import { render } from 'react-dom';

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${sec}`;

export function languagesApi({ language }) {
   const loadData = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
   );

   return fetch(loadData)
      .then((response) => response.json())
      .then((data) => {
         //console.log(data);
         if (!data.items) {
            throw new Error(data.message);
         }

         return data.items;
      });
}

function getErrorMsg(message, username) {
   if (message === 'Not found') {
      return `${username} does not exists`;
   }
   return message;
}

function getProfile(username) {
   console.log('profile received');
   return fetch(`https://api.github.com/users/${username}${params}`)
      .then((res) => res.json())
      .then((profile) => {
         console.log('Profile data is --> ', profile);
         if (profile.message) {
            throw new Error(getErrorMsg(profile.message, username));
         }
         return profile;
      });
}

function getRepo(username) {
   console.log('repo received');
   return fetch(
      `https://api.github.com/users/${username}/repos${params}&per_page=100`
   )
      .then((res) => res.json())
      .then((repos) => {
         console.log('Repos data is -->', repos);
         if (repos.message) {
            throw new Error(getErrorMsg(repos.message, username));
         }
         return repos;
      });
}

function getStarCount(repos) {
   return repos.reduce((count, { stargazers_count }) => {
      return count + stargazers_count;
   }, 0);
}

function calculateScore(followers, repos) {
   let counts = getStarCount(repos);
   console.log(counts);
   return followers * 3 + counts;
}

function getUserData(player) {
   return Promise.all([getProfile(player), getRepo(player)]).then(
      ([profile, repos]) => {
         console.log('upto get data is ok');
         return {
            profile,
            score: calculateScore(profile.followers, repos),
         };
      }
   );
}

function sortPlayer(players) {
   return players.sort((a, b) => b.score - a.score);
}
export function battle(players) {
   return Promise.all([getUserData(players[0]), getUserData(players[1])])
      .then(sortPlayer)
      .then((result) => {
         return result;
      });
}
