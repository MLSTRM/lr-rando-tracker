// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer } from "electron";
import type { RandoMemoryState } from "lr-rando-autotracker";

let pollInterval: NodeJS.Timer;

let pollingObtainedChecks: NodeJS.Timer[] = [];

const inactive = 'inactive';

window.onload = () => {
  setupClickToggle();
  setupClickRange();
  hideAutotrackerElements();
}

function setupClickToggle() {
  const elems = document.getElementsByClassName('clickToggle');
  for(var i = 0; i<elems.length; i++){
    elems[i].addEventListener('click', toggleInactive(elems[i]));
    elems[i].classList.add(inactive);
  }
}

function setupClickRange(){
  const elems = document.getElementsByClassName('clickRange');
  for(var i = 0; i < elems.length; i++){
    const elem = elems[i];
    const min = Number(elem.getAttribute('data-min'));
    const max = Number(elem.getAttribute('data-max'));
    const threshold = Number(elem.getAttribute('data-threshold')) || 0;
    const valueSpan = elem.getElementsByClassName('value').item(0);
    const leftDiv = document.createElement('div');
    leftDiv.appendChild(document.createTextNode('-'));
    leftDiv.classList.add('rangeLeft');
    leftDiv.addEventListener('click', () => decrementValueSpan(valueSpan, elem, threshold, min));
    const rightDiv = document.createElement('div');
    rightDiv.appendChild(document.createTextNode('+'));
    rightDiv.classList.add('rangeRight');
    rightDiv.addEventListener('click', () => incrementValueSpan(valueSpan, elem, threshold, max));
    elem.appendChild(leftDiv);
    elem.appendChild(rightDiv);
    if(valueSpan?.textContent === min.toString() && min <= threshold){
      elem.classList.add(inactive);
    }
  }
}

function decrementValueSpan(el: Element | undefined | null, parent: Element, threshold: number, min?: number){
  if(!el){return;}
  const value = Number(el.textContent);
  const newVal = Math.max(value - 1, min || 0);
  el.textContent = newVal.toString();
  if(newVal> threshold){
    if(parent.classList.contains(inactive)){
      parent.classList.remove(inactive);
    }
  } else {
    parent.classList.add(inactive);
  }
}

function incrementValueSpan(el: Element | undefined | null, parent: Element, threshold: number, max?: number){
  if(!el){return;}
  const value = Number(el.textContent);
  const newVal = Math.min(value + 1, max || Number.MAX_SAFE_INTEGER);
  el.textContent = newVal.toString();
  if(newVal> threshold){
    if(parent.classList.contains(inactive)){
      parent.classList.remove(inactive);
    }
  } else {
    parent.classList.add(inactive);
  }
}

function toggleInactive(el: Element){
  return () => {
    if(el.classList.contains(inactive)){
      el.classList.remove(inactive);
    } else {
      el.classList.add(inactive);
    }
  }
}

function hideAutotrackerElements(){
  const trackerElements = document.getElementsByClassName('autoTracker');
  for(var i = 0; i<trackerElements.length; i++){
    trackerElements[i].setAttribute('hidden', 'true');
  }
}

function beginPoll() {
  document.getElementById('autoPollButton')?.setAttribute('disabled', 'true');
  document.getElementById('detatchButton')?.removeAttribute('disabled');
  const trackerElements = document.getElementsByClassName('autoTracker');
  for(var i = 0; i<trackerElements.length; i++){
    trackerElements[i].removeAttribute('hidden');
  }
  let event = 'randoFull';
  pollInterval = setInterval(() => ipcRenderer.invoke(event).then((result: Partial<RandoMemoryState>) => {
    event = 'randoPoll';
    if(!result){
      clearInterval(pollInterval);
      document.getElementById('autoPollButton')?.removeAttribute('disabled');
      document.getElementById('detatchButton')?.setAttribute('disabled', 'true');
      hideAutotrackerElements();
    }
    setPropOnElem('#elem', JSON.stringify(result, (key, value) => {
        if(value instanceof Map) {
          return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
          };
        } else {
          return value;
        }
      }, 4)
    );
    if(result){
      if(result.time?.day ?? 0 < 0){
        setPropOnElem('#basicInfoLoading', 'No save active!');
      }

      setPropOnElem('#basicInfoLoading', '');
      setPropOnElem('#basic_day', result.time?.day);
      setPropOnElem('#basic_trueday', result.time?.trueDay);
      setPropOnElem('#basic_time', `${result.time?.hour.toString().padStart(2,'0')}:${result.time?.minute.toString().padStart(2,'0')}`);
      setPropOnElem('#basic_region', result.region?.map);
      setPropOnElem('#basic_zone', !!result.region?.known ? result.region?.zone : undefined);
      setPropOnElem('#basic_gil', result.gil);
      setPropOnElem('#basic_ep', result.maxEP);
      setPropOnElem('#basic_recovery', result.recoveryItemSlots);
      setPropOnElem('#basic_schema', result.schemas?.active);
      setPropOnElem('#basic_epAbilities', convertArrayToList(result.epAbilities));
      setPropOnElem('#basic_keyItems', convertMapToTable(result.keyItems));
      setPropOnElem('#basic_items', convertMapToTable(result.items));
      setPropOnElem('#basic_odin', result.odinHealth);

      setPropOnElem('#auto-trueday', result.time?.trueDay);
      setPropOnElem('#auto-time', `${result.time?.hour.toString().padStart(2,'0')}:${result.time?.minute.toString().padStart(2,'0')}`);
      setPropOnElem('#auto-region', result.region?.map);
      setPropOnElem('#auto-zone', !!result.region?.known ? `- ${result.region?.zone}` : '');
      setPropOnElem('#auto-schema', result.schemas?.active);
      setPropOnElem('#auto-gil', result.gil);
      setPropOnElem('#auto-ep', result.maxEP);
      setPropOnElem('#auto-itemslots', result.recoveryItemSlots);
      setPropOnElem('#auto-odin-health', result.odinHealth);
      if(result.odinHealth){
        const {level, next} = getOdinLevels(result.odinHealth);
        setPropOnElem('#auto-odin-level', level);
        setPropOnElem('#auto-odin-next', !!next ? `/ ${next}` : '');
      }
      
    } else {
      setPropOnElem('#basicInfoLoading', 'Loading');
    }
  }), 2000);

  const autoTrackElements = document.getElementsByClassName(inactive);
  for(var i = 0; i<autoTrackElements.length; i++){
    const elem = autoTrackElements[i];
    const oneWay = elem.getAttribute('data-oneway');
    const itemName = elem.getAttribute('data-key');
    if(itemName){
      const interval = setInterval(() => {
        ipcRenderer.invoke('randoKeyItemCheck', ...itemName.split(',')).then((result: number) => {
          if(elem.classList.contains('clickToggle')){
            if(result > 0 && elem.classList.contains(inactive)){
              elem.classList.remove(inactive);
              if(oneWay){
                clearInterval(interval);
              }
            }
          } else if (elem.classList.contains('clickRange')) {
            const valueSpan = elem.getElementsByClassName('value').item(0);
            if(valueSpan){
              const currentValue = Number(valueSpan.textContent);
              if(!oneWay || result > currentValue){
                valueSpan.textContent = result.toString();
                const threshold = Number(elem.getAttribute('data-threshold'));
                if(threshold){
                  if(result > threshold){
                    elem.classList.remove(inactive);
                    if(oneWay){
                      clearInterval(interval);
                    }
                  }
                } else {
                  if(result > 0){
                    elem.classList.remove(inactive);
                  } else {
                    elem.classList.add(inactive);
                  }
                }
              }
            }
          }
        });
      }, 2000);
      pollingObtainedChecks.push(interval);
    }
    const epName = elem.getAttribute('data-epkey');
    if(epName){
      const interval = setInterval(() => {
        ipcRenderer.invoke('randoEPCheck', epName).then((result: boolean) => {
          if(elem.classList.contains('clickToggle')){
            if(result && elem.classList.contains(inactive)){
              elem.classList.remove(inactive);
            }
          }
        });
      }, 2000);
      pollingObtainedChecks.push(interval);
    }
    const mainQuest = elem.getAttribute('data-mainquest');
    if(mainQuest){
      const interval = setInterval(() => {
        ipcRenderer.invoke('randoMainQuestCheck', mainQuest).then((result: number) => {
          const valueSpan = elem.getElementsByClassName('value').item(0);
          if(valueSpan){
            const currentValue = Number(valueSpan.textContent);
            if(result > currentValue){
              valueSpan.textContent = result.toString();
              const threshold = Number(elem.getAttribute('data-threshold'));
              if(threshold){
                if(result > threshold){
                  elem.classList.remove(inactive);
                  clearInterval(interval);
                }
              } else {
                elem.classList.remove(inactive);
              }
            }
          }
        });
      });
    }
  }
}

function getOdinLevels(health?: number): {level: number; next?: number} {
  if(!health || health<120){
    return {
      level: 0,
      next: 120
    }
  } else if (health < 250){
    return {
      level: 1,
      next: 250
    }
  } else if (health<400){
    return {
      level: 2,
      next: 400
    }
  }
  return {
    level: 3
  }
}

function detatchTracker() {
  ipcRenderer.invoke('randoDisconnect');
  clearInterval(pollInterval);
  pollingObtainedChecks.forEach(i => clearInterval(i));
}

function setPropOnElem(selector: string, value: any){
  if(typeof value === 'undefined'){
    return;
  }
  const elem = document.querySelector(selector);
  if(elem){
    elem.innerHTML = value;
  }
}

function convertArrayToList(arr?: any[]): string | undefined {
  if(!arr){
    return undefined;
  }
  return arr.map(el => `<li>${el}</li>`).join('');
}

function convertMapToTable(map?: Map<any, any>): string | undefined {
  if(!map){
    return undefined;
  }
  return [...map].map(obj => `<tr><td>${obj[0]}</td><td>${obj[1]}</td></tr>`).join('');
}

// Todo:
// Check if I can have ipc renderer hooks in both directions maybe (seems yes - that will be helpful for settings etc.)
// Scan for quest text and quest completion flags maybe also (not found :/)
// use bartz hint mapping to find quest names? (not found :/)
// Start hooking up quest/npc info sections (done the backing, need to do the UI side)

// Start working on NPC availability based on time (clamp view window into range[], convert to rectangles?)
// Create quests section with auto scanning of inventory/completion requirements
// pull icons from the thing bartz pointed me at / I unpacked

// yusnaan values
//Check wildlands temple area mappings (yup really is p numbers. WHYYYY)
//obtaining key item doesn't unset inactive (pilgrims crux, fireworks - check autotrack value logic for removing inactive, same with odin also)
//curaga and escape show up in the intro?
//disconnecting and reconnecting bugs out

// use library on ark for boss tracking (?)
