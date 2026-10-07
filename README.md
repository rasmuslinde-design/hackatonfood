# NutriKauss

NutriKauss on eestikeelne, brauseris mängitav toitumisõppe mäng. Mängija koostab eri olukordadeks sobivaid eineid, õpib toidugruppe tasakaalustama ja märkab toite, mida saab toiduraiskamise vältimiseks ära kasutada. Avalehel pöörleb interaktiivne 3D-toidupüramiid ning mänguvaates pöörleb 3D-kauss. Mängu lõpetamisel saab kirstust võita kogutavaid Panda kaarte.

## Mängureeglid

### Eesmärk

Valmista igal tasemel olukorrale sobiv eine, kasutades riiulil olevaid toiduaineid. Püramiidi tasemed avanevad mängu edenedes.

| Tase | Teema | Mängu eesmärk |
| --- | --- | --- |
| 1. Hommik & Eksam | Hommikusöök | Koosta pikkadeks koolipäevadeks sobiv eine aeglasest süsivesikust ja valgust. |
| 2. Taldrikureegel | Lõunasöök | Tasakaalusta valk, taimsed toidud ja mõõdukas kogus süsivesikuid. |
| 3. Trennijärgne | Taastumine | Vali taastumiseks valgu- ja energiarikkad toidud. |
| 4. Maiustused | Lõpptase | Eelista tasakaalu ja hoia maiustuste kogus väike. |

Iga taseme alguses kuvatakse päevaülesanne ja toidukorra eesmärk. Riiulile valitakse juhuslikult kaheksa tasemele sobivat toiduainet; korraga on näha neli toodet ning nooltega saab avada teise lehe. Toiduvalik on tasemeti kaalutud ning rämpstoidu osakaal on piiratud.

### Eine koostamine

1. Vali avalehel avatud korrus püramiidilt või korrusenupuga. Lukus taseme valimine kuvab teate, kuid ei muuda valitud taset.
2. Lohista toiduaine riiulilt kaussi. Lohistamine töötab hiire ja puuteekraaniga. Klaviatuuriga saab fookustatud toiduainet lisada Enteri või tühikuklahviga.
3. Eemalda toiduaine kausist, vajutades selle kausis olevale sildile.
4. Kaussi mahub kuni kolm toiduainet; eine hindamiseks peab seal olema vähemalt üks.
5. Vajuta **Sega & Söö**, et näha einetulemust ja tagasisidet.

### Punktid ja tagasiside

- Ühe toiduainega eine tulemuse ülempiir on 35%, kahe toiduainega 70% ja kolme toiduainega 100%.
- Kolmest toidust koosnev terve eine saab toitainete tasakaalu eest +15 punkti, kui selles on süsivesik, valk ning puu- või köögivili.
- Kolm ainult soolast või ainult magusat toitu võivad anda maitsesünergia eest +15 punkti.
- Kolme toiduga einele rakendub −15 punkti maitsekonflikti eest, kui selles on soolane põhitoit ja rämpstoit.
- Tervislik ja tasakaalus kolmest toidust koosnev eine võib saavutada 100%.
- Hinne A algab 90 punktist, B 50 punktist ning alla selle saab mängija hinde C.
- Kui kausis on päästetud toit, annab see +10 säästlikkuse boonust. Negatiivse punktiväärtusega päästetud toidu mõju arvestatakse positiivsena.

Igal tasemel märgitakse juhuslikult üks või kaks mitterämpstoitu päästetuks. Need on kaardil tähistatud märgiga **♻️ Päästetud toit!**. Tulemuse tagasisides kuvatakse ka tasemele vastav toiduraiskamist vältiv soovitus.

Pärast eine hindamist avaneb järgmine tase. Taseme avamine ei eelda kindla hinde saamist. Mängu edenemine ja parim skoor salvestatakse selle brauseri kohalikku salvestusruumi. Pärast viimase taseme lõpetamist ja tulemuse sulgemist alustatakse uut mänguringi esimeselt tasemelt.

### Juhtimine

- **Avaleht:** klõpsa või puuduta püramiidi korrust, et see valida. Lohista püramiidil sõrmega selle pööramiseks; hiirega saab korrustel hõljuda ja neid valida.
- **Toidud:** lohista toit kaussi hiire või sõrmega. Tavaline klõps toidukaardil toitu kaussi ei lisa.
- **Kausis olev toit:** klõpsa või puuduta toidu silti selle eemaldamiseks.
- **Hint:** mänguvaate pirnipildiga nupp avab taseme eesmärgi.
- **Home:** majapildiga nupp küsib enne avalehele naasmist kinnitust.
- **Panda kaardid:** avalehel pealkirja „Vali tase“ kõrval olev nupp avab kaardikogu.

## Panda kaardid ja GAMBA!

### Kaardikogu

Avalehe nupp **Panda kaardid** avab kogu, kus on täpselt 2 veergu ja 10 rida (kokku 20 kaarti) järjekorras Tavaline → Haruldane → Üliharuldane → Legendaarne.

- Lukus kaart on näha mustana (`filter: brightness(0)`) ja kergelt tumendatuna. Kui brauser lubab pildi andmeid lugeda, kuvatakse see panda mustas siluetis.
- Lahti lukustatud kaart on täisvärvides. Sellele klõpsates saab selle aktiivseks tegelaseks; aktiivne kaart saab rohelise piirjoone ja kuldse sära.
- Lahti lukustatud kaardid ja aktiivne kaart säilivad brauseri `localStorage`-is (vt allpool).

### GAMBA! kirst

Pärast 4. korruse lõpetamist ilmub tulemuse aknasse nupp **GAMBA!**. Selle vajutamisel avaneb tume kirstu pop-up, kus kaardirulett liigub vasakult paremale: algul väga kiiresti, siis sujuvalt aeglustudes, kuni jääb seisma võidetud kaardi peal. Seejärel kuvatakse teade **UUS KAART LAHTI LUKUSTATUD!**, kaart lisatakse kogusse ja selle saab kohe samast aknast aktiivseks teha (või hiljem kaardikogust). Kui kaart on juba olemas, antakse sellest teada. Iga lõpetatud mänguring annab ühe kirstu.

| Haruldus | Kaust | Kaarte | Võidu tõenäosus |
| --- | --- | --- | --- |
| Tavaline (Common) | `skinid/common/` | 6 | 65% |
| Haruldane (Rare) | `skinid/rare/` | 6 | 22% |
| Üliharuldane (Super Rare) | `skinid/super rare/` | 5 | 10% |
| Legendaarne (Ultra Rare) | `skinid/ultra rare/` | 3 | 3% |

Esmalt loositakse haruldus ja seejärel valitakse selle sees kaart juhuslikult.

### Salvestus ja testimine

| `localStorage` võti | Sisu |
| --- | --- |
| `unlockedSkins` | JSON-massiiv lahti lukustatud kaartide id-dega, nt `["Blue Cap Panda"]` |
| `activeSkin` | Aktiivse kaardi id tavalise stringina, nt `Blue Cap Panda` |

Kaardi id on panda nimi ehk failinimi ilma laiendita. Need võtmed on eraldi mänguedenemisest, seega ei kustuta mängu lähtestamine kaarte. Brauseri konsoolis saab kasutada `window.PandaCards`:

```js
PandaCards.openGacha(); // avab kirstu ilma mängu läbimata
PandaCards.unlockSkin("Doctor Panda");
PandaCards.setActiveSkin("Doctor Panda");
PandaCards.getActiveSkinData(); // aktiivse kaardi andmed (id, nimi, haruldus, pildi tee)
```

Aktiivse kaardi muutudes saadetakse `window`-sündmus `panda-skins-change`, mida saab kasutada tegelase kuvamiseks mujal mängus.

## Käivitamine lokaalselt

Projekt on staatiline veebirakendus ega vaja koostamist ega paketihalduri installi. Käivita veebiserver projekti juurkaustas:

```bash
git clone https://github.com/rasmuslinde-design/hackatonfood.git
cd hackatonfood
python3 -m http.server 8765
```

Vaja on Python 3. Seejärel ava brauseris [http://localhost:8765](http://localhost:8765). Alternatiivina sobib VS Code’i Live Serveri laiendus. Ära ava `index.html` otse `file://` aadressina: 3D-moodulid vajavad HTTP(S)-serverit.

Three.js ja VT323 font laaditakse CDN-ist, seega vajab nende laadimine internetiühendust.

## Avaldamine GitHub Pages’is

Rakendus on juurkaustast serveeritav staatiline sait ning eraldi build-käsku pole vaja.

1. Lükka projekt GitHubi harusse.
2. Ava repositooriumis **Settings → Pages**.
3. Vali **Deploy from a branch**, seejärel vaikimisi haru ja kaust `/ (root)`.
4. Salvesta valik ning ava Pages’i seadetes näidatud avalik URL.

Veendu, et HTML, JavaScript, CSS ja pildikaustad oleksid kõik avaldatud. Faili- ja kaustanimede suur- ning väiketähed peavad GitHub Pages’is täpselt kattuma viidetega.

## Tehnoloogiad

- HTML5 ja CSS3
- Tavaline JavaScript, ilma build-tööriistata
- Three.js 0.180.0, laaditakse jsDelivr'i CDN-ist
- VT323 font Google Fontsist
- `localStorage` mänguedu, parima skoori ja Panda kaartide säilitamiseks

Rakendus vajab kaasaegset brauserit, mis toetab JavaScripti ES-mooduleid ja WebGL-i.

## Projekti struktuur

| Fail või kaust | Sisu |
| --- | --- |
| `index.html` | Avalehe ja mänguvaate struktuur |
| `style.css` | Pixel-art stiil ja kohanduv kujundus |
| `app.js` | Mängu olek, tasemed, toiduvalik, lohistamine, hindamine ja edenemise salvestamine |
| `skins.js` | Panda kaardid: kataloog, kaardikogu, siluetid, GAMBA! kirst, rulett ja salvestus |
| `foods.js` | Toiduainete andmebaas ja piltide viited |
| `pyramid3d.js` | Pöörlev 3D-toidupüramiid ja korruste valimine |
| `bowl3d.js` | Pöörleva 3D-kausi geomeetria ja renderdamine |
| `Food pyramid/Line/` | Toiduainete pixel-art pildid kategooriate kaupa |
| `buttons/` | Pildinupud: `skins.png` (Panda kaardid), `hint.png` (Hint), `home.png` (Home) |
| `skinid/` | Panda kaardid haruldusastme kaustades `common`, `rare`, `super rare` ja `ultra rare` |
| `Pixel Art Treasure Chest.png` | GAMBA! pop-upi kirstu pilt |
| `NutriKauss.jpg` | Avalehe logo |
| `taustapilt.jpg` | Veebilehe taustapilt |

Toiduandmetes kasutatakse muu hulgas välju `flavor` (`savory`, `sweet`, `neutral`), `type` (`carb`, `protein`, `produce`, `junk`) ja `mealType` tasemele sobiva valiku tegemiseks. Päästetud toidu märge määratakse mängu käivitamisel juhuslikult sobivatele toitudele.

## Edenemise lähtestamine

Edenemine salvestatakse võtme `foodPyramidGameProgress` alla brauseri `localStorage`-isse. Testimiseks saab selle kustutada brauseri arendajakonsoolis:

```js
localStorage.removeItem("foodPyramidGameProgress");
location.reload();
```

Panda kaartide lähtestamiseks:

```js
localStorage.removeItem("unlockedSkins");
localStorage.removeItem("activeSkin");
location.reload();
```

## Panustamine

Muudatuste jaoks loo eraldi haru, testi mängu nii arvuti- kui mobiilivaates ning ava GitHubis pull request koos muudatuste kirjeldusega. Eriti kontrolli tasemete avamist, toidu lohistamist, 3D-vaadete kuvamist ning Panda kaartide kogu ja GAMBA! kirstu.

## Litsents

Repositooriumis ei ole praegu `LICENSE`-faili. Enne koodi või kaasasolevate pildifailide avalikku levitamist määra projektile sobiv litsents ning kontrolli varade kasutusõigusi.
