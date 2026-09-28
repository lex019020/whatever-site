---
title: Whatever.cc
aside: false
---

<script setup>
import { data as posts } from '../.vitepress/posts.data.mjs'
</script>

# Whatever cycling club

## Šta je to

Whatever<span>.cc</span> (od milja - „vatever“) - klub ljubitelja drumskog biciklizma. A često se desi i gravel, a baš retko MTB.

## Gde

Baza kluba je Novi Sad, Srbija. Ali ponekad negde i odemo, uglavnom po drugim gradovima u Srbiji, a ponekad i u okolne zemlje.

## Ko smo mi

Uglavnom rekreativci i entuzijasti. Ima nas različitog nivoa spremnosti, ali niko ne obećava da će se prilagođavati najsporijima.

**Minimalni nivo.** Ako možeš:

- da se popneš na Frušku, recimo usponom iz Rakovca ili Beočina, bez stajanja i silaženja s bicikla;
- da odvoziš 60 km po ravnom sa prosekom od 30 km/h,

onda će ti na većini vožnji biti sasvim ok. Ako još ne možeš - biće ti poprilično teško, pa bolje malo potreniraj i dođi malo kasnije. Mi ne idemo nigde.

Trenutno su u klubu aktivni samo momci i devojke koji govore ruski. Lokalne bicikliste nažalost zasad nismo uspeli da privučemo (ali nismo se ni baš trudili).

Čet je uglavnom na ruskom, ali danas svako ima prevodilac u telefonu, tako da možeš da dođeš i bez znanja ruskog. A i engleski kod nas svi dobro znaju.

## Kako vozimo

Uglavnom vozimo drumski, u grupi. Trudimo se da po ravnom vozimo zajedno, sa smenama, a na brdima se skupljamo posle većih uspona i spustova. Ali proceni svoje snage: no-drop nije garantovan, osim ako to ne piše u najavi.

U najavama se tempo vožnje označava lunama, a šta one znače, piše u [vodiču za grupnu vožnju](./posts/group-riding.md#tempo-u-najavama).

Obavezno pročitaj i [pravila učešća](./posts/rules.md) i [vodič za grupnu vožnju](./posts/group-riding.md).

## Kad vozimo

Kad nam dune, ali obično jedna vožnja četvrtkom uveče i jedna vikendom ujutru, u toploj sezoni češće, u hladnoj - ređe.

Najave su uglavnom u našem zatvorenom četu na Telegramu. Ponekad ih okačimo na [Instagram](https://www.instagram.com/whatevercc.rs/) ili ih prosledimo u druge četove.

## Kako da se priključiš

Najlakše je preko poznanstva. Ako lično znaš nekog iz kluba, javi mu se, pa će te dodati u čet.

Ako nikog ne znaš, piši na [Instagram kluba](https://www.instagram.com/whatevercc.rs/) ili osnivaču i doživotnom vođi na Telegramu - [@lex019020](https://t.me/lex019020). Ukratko reci nešto o sebi, kako si čuo/la za nas, i pošalji link na svoj Strava profil.

Ne želimo u četu botove, ludake i mrtve duše, pa ćemo prvo malo da popričamo.

## Linkovi

- [Instagram](https://www.instagram.com/whatevercc.rs/) - slike sa vožnji
- [Klub na Zwiftu](https://www.zwift.com/clubs/3654b416-a5a1-473a-b495-6caee3ab6be1/home) - vozimo zajedno zimi i kad je loše vreme

<div class="sep" />

## Članci

<ul>
  <li v-for="post of posts.filter((p) => p.locale === 'sr')" :key="post.url">
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
