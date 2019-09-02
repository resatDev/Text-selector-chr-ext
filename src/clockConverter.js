/**
 * 
 * @param {string} selected 
 */

export const clockAmConv = (selected) => {
    return selected.split(' ')[0]
 }

 export const clockPmConv = (selected) => {
     let clock = (Number(selected.split(' ')[0].split(':')[0]) + 12).toString()
     if(clock == '24'){
         clock = '00'
     }
     return clock + ':' + selected.split(' ')[0].split(':')[1]
 }