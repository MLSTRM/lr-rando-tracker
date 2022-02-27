// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import { ipcRenderer } from "electron";
import type { RandoMemoryState } from "lr-rando-autotracker";
import type { SideQuestProgress } from "lr-rando-core";
import type { EnrichedQuestInfo, EnrichedQuestRequirement } from "lr-rando-core/build/quests/model";

let pollInterval: NodeJS.Timer;

let pollingObtainedChecks: NodeJS.Timer[] = [];

const inactive = 'inactive';

window.onload = () => {
  setupClickIds();
  setupClickToggle();
  setupClickRange();
  hideAutotrackerElements();
  updateTheme(true);
  updateColumnWidth(true);
  updateBodyTheme(true);
  updateCanvasHalf(true);
  setSideSortByName(true);
  setSideHideComplete(true);
  //updateCanvasRegion();
  updateSideQuestRegion();
  addQuestHintRow();
  prepareShopHints();
}

function setupClickIds(){
  let id = 0;
  const toggleElements = document.getElementsByClassName('clickToggle');
  for(var i = 0; i < toggleElements.length; i++){
    const element = toggleElements[i];
    if(!element.id){
      element.id=`click_toggle_${id}`;
      id++;
    }
  }
  const rangeElements = document.getElementsByClassName('clickRange');
  for(var i = 0; i < rangeElements.length; i++){
    const element = rangeElements[i];
    if(!element.id){
      element.id=`click_range_${id}`;
      id++;
    }
  }
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

function getActiveBoxes(): string[] {
  const activeElements: string[] = [];
  const toggleElems = document.getElementsByClassName('clickToggle');
  for(var i = 0; i < toggleElems.length; i++){
    const elem = toggleElems[i];
    if(!elem.classList.contains(inactive)){
      activeElements.push(elem.id);
    }
  }
  const rangeElems = document.getElementsByClassName('clickRange');
  for(var i = 0; i < rangeElems.length; i++){
    const elem = rangeElems[i];
    if(!elem.classList.contains(inactive)){
      activeElements.push(elem.id);
    }
  }
  return activeElements;
}

function inflateActiveBoxes(ids: string[]){
  for(const id of ids){
    const elem = document.getElementById(id);
    elem?.classList.remove(inactive);
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
      if((result.time?.day ?? 0 < 0) || (result.maxEP && result.maxEP > 20)){
        setPropOnElem('#basicInfoLoading', 'No save active!');
      }

      setPropOnElem('#basicInfoLoading', '');
      setPropOnElem('#basic_day', result.time?.day);
      setPropOnElem('#basic_trueday', result.time?.trueDay);
      if(result.time){
      setPropOnElem('#basic_time', `${result.time?.hour.toString().padStart(2,'0')}:${result.time?.minute.toString().padStart(2,'0')}`);
      }
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

      //if(result.sideQuestProgress){
        //setPropOnElem('#base_side_quests', convertSideQuestProgressToTable(result.sideQuestProgress));
      //}
      //if(result.canvasOfPrayers){
        //setPropOnElem('#base_canvas_acc', convertCanvasProgressToTable(result.canvasOfPrayers?.accepted));
        //setPropOnElem('#base_canvas_done', convertCanvasProgressToTable(result.canvasOfPrayers?.completed));
      //}

      setPropOnElem('#auto-trueday', result.time?.trueDay);
      if(result.time){
      setPropOnElem('#auto-time', `${result.time?.hour.toString().padStart(2,'0')}:${result.time?.minute.toString().padStart(2,'0')}`);
      }
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
        setPropOnElem('#auto-odin-next', !!next ? `/${next}` : '');
        if(level > 0){
          const healthElem = document.getElementById('odin-parent');
          healthElem?.classList.remove(inactive);
        }
      }
      setPropOnElem('#auto-seeds', result.soulSeeds);
      setPropOnElem('#auto-unappraised', result.unappraised);
      
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
    const garb = elem.getAttribute('data-garb');
    if(garb){
      const interval = setInterval(() => {
        ipcRenderer.invoke('garbCheck', garb).then((result: boolean) => {
          if(elem.classList.contains('clickToggle')){
            if(result && elem.classList.contains(inactive)){
              elem.classList.remove(inactive);
            }
          }
        });
      }, 2000);
      pollingObtainedChecks.push(interval);
    }
    const sideq = elem.getAttribute('data-sideq');
    if(sideq){
      const interval = setInterval(() => {
        ipcRenderer.invoke('sideQuestNamedInfo', sideq).then((result: {status: string}) => {
          if(elem.classList.contains('clickToggle')){
            if(result?.status === 'Complete' && elem.classList.contains(inactive)){
              elem.classList.remove(inactive);
            }
          }
        });
      }, 2000);
      pollingObtainedChecks.push(interval);
    }
    //setInterval(updateCanvasRegion, 5000);
    setInterval(updateSideQuestRegion, 5000);
  }
}

//Push to backend?
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
  document.getElementById('detatchButton')?.setAttribute('disabled', 'true');
  document.getElementById('autoPollButton')?.removeAttribute('disabled');
  const trackerElements = document.getElementsByClassName('autoTracker');
  for(var i = 0; i<trackerElements.length; i++){
    trackerElements[i].setAttribute('hidden', '');
  }
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

function convertPrerequisiteToTable(arr?: {name: string; complete: boolean;}[]): string | undefined {
  if(!arr){
    return undefined;
  }
  return arr.map(el => `<tr><td>${el.name}</td><td>${el.complete ? 'Y' : 'N'}</td></tr>`).join('');
}

function convertMapToTable(map?: Map<any, any>): string | undefined {
  if(!map){
    return undefined;
  }
  return [...map].map(obj => `<tr><td>${obj[0]}</td><td>${obj[1]}</td></tr>`).join('');
}

function convertRequirementsToTable(obj?: EnrichedQuestRequirement): string | undefined {
  if(!obj){
    return undefined;
  }
  return Object.entries(obj).map(v => {
    if(typeof v[1].required === 'boolean'){
      return `<tr><td>${v[0]}</td><td></td><td>${v[1].current ? 'Y' : 'N'}</td></tr>`;
    } else {
      return `<tr><td>${v[0]}</td><td>${v[1].required}</td><td>${v[1].current}</td></tr>`;
    }
  }).join('');
}

function convertSideQuestProgressToTable(obj?: {[key: string]: SideQuestProgress[]}): string | undefined {
  if(!obj){
    return undefined;
  }
  const arr = Object.values(obj).filter(val => val.length > 0).flatMap(val => val.sort(orderQuestInfo).map(obj => `<tr><td>${obj.name}</td><td>${obj.status.substr(0,2)}</td></tr>`));
  if(arr.length === 0){
    return undefined;
  }
  //console.log(JSON.stringify(obj));
  return arr.join('');
}

function orderQuestInfo(a: SideQuestProgress, b: SideQuestProgress): number {
  return -1*a.status.localeCompare(b.status) || a.name.localeCompare(b.name);
}

function convertCanvasProgressToTable(obj?: {[key: string]: string[]}): string | undefined {
  if(!obj){
    return undefined;
  }
  const arr = Object.values(obj).filter(val => val.length > 0).flatMap(val => [...val]);
  if(arr.length === 0){
    return undefined;
  }
  //console.log(JSON.stringify(obj));
  return arr.map(obj => `<tr><td>${obj}</td></tr>`).join('');
}

//Display config region start - move to separate file?
function updateTheme(initial?: boolean){
  const themeElement = document.getElementById('theme') as HTMLSelectElement;
  const theme = (initial ? localStorage.getItem('display-theme') : undefined) ?? themeElement.value;
  themeElement.value = theme;
  localStorage.setItem('display-theme', theme);
  const metaRegion = document.getElementById('pretty_region_meta_1');
  if(metaRegion){
    metaRegion.classList.value = '';
    metaRegion.classList.add('row', 'column100', theme);
  }
}

function updateBodyTheme(initial?: boolean){
  const themeElement = document.getElementById('bodyTheme') as HTMLSelectElement;
  const theme = (initial ? localStorage.getItem('display-body-theme') : undefined) ?? themeElement.value;
  themeElement.value = theme;
  localStorage.setItem('display-body-theme', theme);
  const metaRegion = document.getElementById('mainBody');
  if(metaRegion){
    metaRegion.classList.value = '';
    metaRegion.classList.add(theme);
  }
}

function updateColumnWidth(initial?: boolean){
  const widthElement = document.getElementById('columnWidth') as HTMLSelectElement;
  const width = (initial ? localStorage.getItem('display-columnWidth') : undefined) ?? widthElement.value;
  widthElement.value = width;
  localStorage.setItem('display-columnWidth', width);
  document.documentElement.style.setProperty('--column-width', `${width}px`);
}

function updateCanvasHalf(initial?: boolean){
  const halfCanvasElement = document.getElementById('halfCanvasRequirements') as HTMLInputElement;
  const checked = (initial ? (localStorage.getItem('display-halfCanvas') === 'true') : halfCanvasElement.checked);
  if(initial){
    halfCanvasElement.checked = checked;
  }
  localStorage.setItem('display-halfCanvas', checked.toString());
  ipcRenderer.send('settings_halfCanvas', checked);
  setPropOnElem('#canvasLookupSelectedName', '');
  setPropOnElem('#canvasLookupSelectedRegion', '');
  setPropOnElem('#canvasLookupSelectedStatus', '');
  setPropOnElem('#canvasLookupSelectedPrerequisites', '');
  setPropOnElem('#canvasLookupSelectedRequirements', '');
}

function setSideSortByName(initial?: boolean){
  const sideSortNameElement = document.getElementById('sideSortName') as HTMLInputElement;
  const checked = (initial ? (localStorage.getItem('display-sideSortName') === 'true') : sideSortNameElement.checked);
  if(initial){
    sideSortNameElement.checked = checked;
  }
  localStorage.setItem('display-sideSortName', checked.toString());
  updateSideQuestRegion();
}

function setSideHideComplete(initial?: boolean){
  const sideHideCompleteElement = document.getElementById('sideHideComplete') as HTMLInputElement;
  const checked = (initial ? (localStorage.getItem('display-sideHideComplete') === 'true') : sideHideCompleteElement.checked);
  if(initial){
    sideHideCompleteElement.checked = checked;
  }
  localStorage.setItem('display-sideHideComplete', checked.toString());
  updateSideQuestRegion();
}

//Display config region end

async function updateSideQuestRegion(){
  const area = (document.getElementById('sideQuestRegion') as HTMLSelectElement).value;
  
  const sideNames = await ipcRenderer.invoke('sideQuestList', area) as Map<string, SideQuestProgress | undefined>;
  const canvasNames = await ipcRenderer.invoke('canvasList', area) as Map<string, string>;

  let sideNameArray = [...sideNames];
  let canvasNameArray = [...canvasNames];

  if(localStorage.getItem('display-sideHideComplete') === 'true'){
    sideNameArray = sideNameArray.filter(([,q]) => q?.status !== 'Complete');
    canvasNameArray = canvasNameArray.filter(([,s]) => s !== 'Complete');
  }

  const nameFilter = (document.getElementById('sideNameSearch') as HTMLInputElement).value?.toLowerCase();

  if(nameFilter){
    sideNameArray = sideNameArray.filter(([s,]) => s.toLowerCase().includes(nameFilter));
    canvasNameArray = canvasNameArray.filter(([s,]) => s.toLowerCase().includes(nameFilter));
  }

  if(localStorage.getItem('display-sideSortName') === 'true'){
    sideNameArray.sort(([s1,],[s2,]) => s1.localeCompare(s2));
    canvasNameArray.sort(([s1,],[s2,]) => s1.localeCompare(s2));
  }

  const sideTableOut = sideNameArray.map((name) => `<tr><td>${statusToImage(name[1]?.status ?? '')}</td><td onclick="getSideQuestInfo(this, 'sideQuest')">${name[0]}</td></tr>`).join('');
  setPropOnElem('#base_side_quests', sideTableHeader + sideTableOut);

  const canvasTableOut = canvasNameArray.map((name) => `<tr><td>${statusToImage(name[1])}</td><td onclick="getSideQuestInfo(this, 'canvas')">${name[0]}</td></tr>`).join('');
  setPropOnElem('#canvasLookupList', sideTableHeader + canvasTableOut);
}

const sideTableHeader = '<tr><th width="18px"></th><th></th></tr>'

function statusToImage(status: string): string {
  switch(status){
    case 'Complete':
      return '<img src="resources/images/icon_m_pass.png" height="18px" />';
    case 'Failed':
    case 'Missed':
      return '<img src="resources/images/icon_m_fail.png" height="18px" />';
    case 'In Progress':
      return '<img src="resources/images/icon_m_prog.png" height="18px" />';
    case 'Accepted':
      return '<img src="resources/images/icon_m_acc.png" height="18px" />';
    case 'Available':
      return '<img src="resources/images/icon_m_avail.png" height="18px" />';
  }
  if(!status){
    return '-';
  }
  return status;
}

let activeSideQuestPoll: NodeJS.Timer;
async function getSideQuestInfo(el: HTMLElement, type: 'sideQuest'|'canvas'){
  const info = await ipcRenderer.invoke(type+'NamedInfo', el.textContent) as EnrichedQuestInfo & {status: string; region: string; bytes: number[]};
  setPropOnElem('#canvasLookupSelectedName', info.name);
  setPropOnElem('#canvasLookupSelectedRegion', info.region);
  if(info.status){
    setPropOnElem('#canvasLookupSelectedStatus', statusToImage(info.status) + info.status);
  } else {
    setPropOnElem('#canvasLookupSelectedStatus','');
  }
  const prereqTable = convertPrerequisiteToTable([...(info.prerequisiteQuests ?? []), ...(info.prerequisiteOther ?? [])]);
  if(prereqTable){
    setPropOnElem('#canvasLookupSelectedPrerequisites', '<tr><th style="width:100%-20px">Prerequisite</th><th>#</th></tr>' + prereqTable);
  } else {
    setPropOnElem('#canvasLookupSelectedPrerequisites', '');
  }
  if(info.requirements){
    if(!Array.isArray(info.requirements)){
      setPropOnElem('#canvasLookupSelectedRequirements', '<tr><th style="width:100%-20px">Event</th><th>#</th><th>c</th></tr>' + convertRequirementsToTable(info.requirements));
    } else {
      setPropOnElem('#canvasLookupSelectedRequirements', '<tr><th style="width:100%-20px">Event</th><th>#</th><th>c</th></tr>' + info.requirements.map(convertRequirementsToTable).join('<tr><td colspan="2">OR</td></tr>'));
    }
  } else {
    setPropOnElem('#canvasLookupSelectedRequirements', '');
  }
  if(info.trigger && info.trigger !== info.handIn){
    if(typeof info.trigger === 'string'){
      setPropOnElem('#sideLookupSelectedAccept', info.trigger);
    } else {
      setPropOnElem('#sideLookupSelectedAccept', info.trigger.name);
      const av = info.trigger.available;
      setPropOnElem('#sideLookupSelectedAcceptTime', `\n(${av.from} - ${av.to}${av.fromDate ? `, Day ${av.fromDate}+` : ''})`);
    }
  } else {
    setPropOnElem('#sideLookupSelectedAccept', '');
    setPropOnElem('#sideLookupSelectedAcceptTime', '');
  }
  if(info.handIn){
    if(typeof info.handIn === 'string'){
      setPropOnElem('#sideLookupSelectedHandIn', info.handIn);
    } else {
      setPropOnElem('#sideLookupSelectedHandIn', info.handIn.name);
      const av = info.handIn.available;
      setPropOnElem('#sideLookupSelectedHandInTime', `\n(${av.from} - ${av.to}${av.fromDate ? `, Day ${av.fromDate}+` : ''})`);
    }
  } else {
    setPropOnElem('#sideLookupSelectedHandIn', '');
    setPropOnElem('#sideLookupSelectedHandInTime', '');
  }
  /*
  if(info.bytes && info.bytes.length > 0){
    setPropOnElem('#sideLookupDebugStatus', JSON.stringify(info.bytes));
  } else {
    setPropOnElem('#sideLookupDebugStatus', '');
  }
  */
  //Set 5 second loop for current side quest pane
  if(activeSideQuestPoll){
    clearTimeout(activeSideQuestPoll);
  }
  if(pollInterval){
    activeSideQuestPoll = setTimeout(() => getSideQuestInfo(el, type), 5000);
  }
}

function addQuestHintRow(rowData?: string[]){
  const table = document.getElementById('questHintTable') as HTMLTableElement;
  if(!table){return;}
  const newRow = table.insertRow(table.rows.length-1);
  const newCell = newRow.insertCell(0);
  newCell.innerHTML = '-';
  newCell.onclick = removeQuestHintRow(newCell);
  const questCell = newRow.insertCell();
  questCell.innerHTML = `<select ${rowData ? `value="${rowData[1]}"` : ''}>${questSelectBody}</select>`;
  if(rowData){
    (questCell.firstChild as HTMLSelectElement).value = rowData[1];
  }
  const locationCell = newRow.insertCell();
  locationCell.innerHTML = `<input style="width: 90%;" ${rowData ? `value="${rowData[2]}"` : ''}/>`;
  const hasCell = newRow.insertCell();
  hasCell.innerText = 'has';
  const itemCell = newRow.insertCell();
  itemCell.innerHTML = `<input style="width: 90%;" ${rowData ? `value="${rowData[4]}"` : ''}/>`;
}

function removeQuestHintRow(cell: HTMLTableCellElement){
  return (ev: MouseEvent) => {
    const row = cell.parentElement as HTMLTableRowElement;
    const table = row.parentElement as HTMLTableElement;
    table.deleteRow(row.rowIndex);
    return undefined;
  }
}

function prepareShopHints(){
  const headersTable = document.getElementById('shopHeaders') as HTMLTableElement;
  const headerIdMap = new Map([...headersTable.rows].map((e,i) => ([e.id,{name: e.textContent, idx:i}])));
  const shopHintsBody = document.getElementById('shopBody');
  for(const [id, {name,idx}] of headerIdMap.entries()){
    const [shop, idname,] = id.split('_');
    const shopDiv = document.createElement('div');
    shopDiv.id = [shop,idname].join('_');
    shopDiv.style.display = 'none';
    let divContent = `${name}<br/>`;
    for(var i = 0; i<8; i++){
      divContent += `<input id="${[shopDiv.id,i].join('_')}"/>`;
    }
    shopDiv.innerHTML = divContent;
    headersTable.rows[idx].addEventListener('click', ()=>{
      hideAllShops();
      shopDiv.style.display = 'block';
    });
    shopHintsBody?.appendChild(shopDiv);
  }
}

function hideAllShops(){
  const shopHintsBody = document.getElementById('shopBody');
  for(const element of [...shopHintsBody?.children ?? []]){
    (element as HTMLElement).style.display = 'none';
  }
}

function deflateShopHints(id: string): string[]{
  const inputList = [...document.getElementById(id)?.children ?? []];
  inputList.shift();
  return inputList.map(c => (c as HTMLInputElement).value ?? '');
}

function inflateShopHints(id: string, toFill: string[]): void {
  const inputList = [...document.getElementById(id)?.children ?? []];
  inputList.shift();
  toFill.forEach((v, i) => (inputList[i] as HTMLInputElement).value = v);
}

const questSelectBody = `<option value="-1">Unknown</option>
<option value="0">Yus 0-1</option>
<option value="1">Lux 1-1</option>
<option value="2">Lux 1-2</option>
<option value="3">Lux 1-3</option>
<option value="4">Lux 1-4</option>
<option value="5">Lux 1-5</option>
<option value="6">Yus 2-1</option>
<option value="7">Yus 2-2</option>
<option value="8">Yus 2-3</option>
<option value="9">Wild 3-1</option>
<option value="10">Wild 3-2</option>
<option value="11">Wild 3-3</option>
<option value="12">Dead 4-1</option>
<option value="13">Dead 4-2</option>
<option value="14">Dead 4-3</option>
<option value="15">Dead 4-4</option>
<option value="16">Dead 4-5</option>
<option value="17">Sazh 5-1</option>
<option value="18">Sazh 5-2</option>
<option value="19">Sazh 5-3</option>
<option value="20">Sazh 5-4</option>
<option value="21">Sazh 5-5</option>
<option value="22">Sazh 5-6</option>`;

function exportData(){
  const data = {
    seed: (document.getElementById('seed') as HTMLInputElement)?.value,
    notes: (document.getElementById('notes') as HTMLTextAreaElement)?.value,
    hintNumbers: deflateHintGrid(document.getElementById('hintNumberGrid')!),
    hintList: deflateTable(document.getElementById('questHintTable') as HTMLTableElement),
    shopContents: [...document.getElementById('shopBody')?.children ?? []].map(c => ({id: c.id, body: deflateShopHints(c.id)})),
    active: getActiveBoxes()
  };
  (document.getElementById('exportAreaContent') as HTMLTextAreaElement).value = JSON.stringify(data);
  document.getElementById('exportArea')?.removeAttribute('hidden');
}

function importData(){
  document.getElementById('exportArea')?.setAttribute('hidden', '');
  const raw = (document.getElementById('exportAreaContent') as HTMLTextAreaElement).value;
  try {
    const parsed = JSON.parse(raw);
    (document.getElementById('seed') as HTMLInputElement).value = parsed.seed;
    (document.getElementById('notes') as HTMLTextAreaElement).value = parsed.notes;
    inflateHintGrid(parsed.hintNumbers);
    inflateHintTable(parsed.hintList);
    (parsed.shopContents as {id: string, body: string[]}[]).forEach(({id, body}) => inflateShopHints(id, body));
    inflateActiveBoxes(parsed.active);
  } catch (e){
    console.log('Error while importing data');
  }
}

function inflateHintTable(data: string[][]): void {
  data.forEach(row => addQuestHintRow(row));
}

function deflateTable(table: HTMLTableElement): string[][] {
  const rows = [];
  const rowsToMap = [...table.rows];
  rowsToMap.shift();
  rowsToMap.pop();
  for(const row of rowsToMap){
    rows.push([...row.cells].map(deflateInputOrSelect));
  }
  return rows;
}

function deflateInputOrSelect(el: Element): string {
  const child = el.firstChild;
  if(!child && el instanceof HTMLElement){
    return el.innerText;
  }
  if(child instanceof HTMLSelectElement){
    return child.value;
  } else if (child instanceof HTMLInputElement){
    return child.value;
  } else if (child instanceof HTMLSpanElement){
    return child.textContent ?? '';
  } else if (child instanceof HTMLDivElement){
    return child.textContent ?? '';
  }
  return '';
}

function deflateHintGrid(el: HTMLElement): string[][] {
  const cellHintList = [...el.children];
  cellHintList.shift();
  return cellHintList.map(el => [...el.children].map(deflateInputOrSelect));
}

function inflateHintGrid(input: string[][]): void {
  const gridParent = document.getElementById('hintNumberGrid')!;
  const children = [...gridParent?.children];
  children.shift();
  children.forEach((div, i) => {
    const inputRow = input[i];
    const divElements = [...div.children];
    for(const idx in divElements){
      const value = inputRow[idx];
      const el = divElements[idx];
      if(el instanceof HTMLDivElement && el.firstChild instanceof HTMLSpanElement){
        el.firstChild.textContent = value;
      }
    }
  });
}

// Todo:
// Check if I can have ipc renderer hooks in both directions maybe (seems yes - that will be helpful for settings etc.)
// Start hooking up quest/npc info sections (done the backing, need to do the UI side)

// Start working on NPC availability based on time (clamp view window into range[], convert to rectangles?)
// Create quests section with auto scanning of inventory/completion requirements

// use library on ark for boss tracking (?) - works for location but not name. - sync with hints

// find where text pointer moves if hint is open and use that to add to list
// quest hints as well as libras. - do some CE stuff to see if it can be scraped from display text somewhere

/*
TODO:
check TAR using save from dyne
Need to actually complete cried wolf on a save

New features to do:
allow for manual toggle of side/canvas completion (and push to backend + store)
Add way to mark hints as complete rather than deleting?

Shop hints

Select multiple quests for requirement item tracking

allow for rando state persistence, save state to file (works for config), push state back from UI to backend for non-auto use

EP ability cost selection (start at default and allow adjustment up/down)

Fill out remaining quest requirements for formatting.
Hook up questProgressCheck in backend to populate values for prerequisites properly.

pane selection/ordering controls (rather than pop in/out or fixed)
-tracker grid (large)
-inventory panes
-side quest lookup
-canvas lookup
-npc lookup

SORT:
8 chocoborel, 6 slug sweet cardesia

pull boss names from spoiler log
pull hints from spoiler log

Begin work on enriched event/boss names and checks

Quest issues:
Faster than lightning in progress still available
oneway persist by element id in import/export?

Grave opf the colossi gets cropped off...
*/