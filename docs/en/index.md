---
title: Whatever.cc
aside: false
---

<script setup>
import { data as posts } from '../.vitepress/posts.data.mjs'
</script>

# Whatever cycling club

## What is it

Whatever<span>.cc</span> (or just "Whatever" for short) is a club for people who love road cycling. There's also a fair bit of gravel, and every once in a blue moon some MTB.

## Where

The club is based in Novi Sad, Serbia. Now and then we head out somewhere else, mostly to other towns in Serbia, and occasionally to neighboring countries.

## Who we are

Mostly amateurs and enthusiasts. Fitness levels vary, but nobody promises to ride at the pace of the slowest person.

**Minimum level.** If you can:

- climb Fruška Gora, say from Rakovac or Beočin, without stopping or getting off the bike;
- ride 60 km on the flat at a 30 km/h average,

then you'll be fine on most rides. If not yet - it'll be a bit of a struggle, so better build up some fitness and come join a little later. We're not going anywhere.

Right now the active members are all Russian-speaking guys and gals. Sadly, we haven't managed to win over any local riders yet (then again, we haven't exactly tried).

## How we ride

Mostly group road rides. On the flat we try to stay together as a bunch and take turns at the front; in the hills we regroup after the big climbs and descents. But be honest about your fitness: no-drop isn't guaranteed unless the announcement says so.

Ride announcements show the pace in moons - what they mean is explained in the [group riding guide](./posts/group-riding.md#pace-in-announcements).

Also make sure to read the [ride rules](./posts/rules.md) and the [group riding guide](./posts/group-riding.md).

## When we ride

Whenever we damn well feel like it, but usually one ride on Thursday evening and one on a weekend morning. More often in the warm season, less in the cold.

Announcements mostly go out in our private Telegram chat. Sometimes they get posted on [Instagram](https://www.instagram.com/whatevercc.rs/) or reposted to other chats.

## How to join

The easiest way is through someone you know. If you personally know someone in the club, message them and they'll add you to the chat.

If you don't know anyone, DM the [club's Instagram](https://www.instagram.com/whatevercc.rs/) or the founder and leader-for-life on Telegram - [@lex019020](https://t.me/lex019020). Tell us a bit about yourself, how you heard about us, and drop a link to your Strava.

We don't want bots, weirdos or ghost members in the chat, so we'll have a quick chat with you first.

## Links

- [Instagram](https://www.instagram.com/whatevercc.rs/) - ride photos
- [Club on Zwift](https://www.zwift.com/clubs/3654b416-a5a1-473a-b495-6caee3ab6be1/home) - riding together in winter and bad weather

<div class="sep" />

## Articles

<ul>
  <li v-for="post of posts.filter((p) => p.locale === 'en')" :key="post.url">
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>

<style scoped>
.sep {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 3rem 0;
}
</style>
