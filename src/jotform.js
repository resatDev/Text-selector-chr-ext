/**
 * 
 * @param {string} selectedText 
 */

 //parcing username and password
 export const jotform_process = (selectedText) => {
    let parcing = selectedText.split('\n')
    let username = parcing.filter((item) => {
        if(item.includes('username:')){
            return item.slice((item.indexOf('username:')+10), item.length)
        }
    })
    let password = parcing.filter((item) => {
        if(item.includes('password:')){
            return item.slice((item.indexOf('password:')+10), item.length)
        }
    })
    return [username[0], password[0]]
}

//taking header
export const jotform_header = (selectedText) => {
    let parcing = selectedText.split('\n');
    let header =  parcing.filter((item) => {
        if(item.indexOf(' ') == 0){
            return item
        }
    })
    return [header, 'head', 1]
}

//taking questions
export const jotform_question = (selectedText) => {
    let parcing = selectedText.split('\n');

    let questions = parcing.filter((item) => {
        if(Number(item[0]) && item[1] == '.'){
            return item
        }
    })

    let qid = parcing.filter((item) => {
        if(Number(item[0]) && item[1] == '.'){
            return item
        }
    })
    return[questions, 'textbox', qid]
}

//creating an object about questions
export const jotformFormItem = (field_type, field_text, qid) => {
    let a = {};
    if(qid == 1){
        a[`properties[title]`] = `${field_text}`;
    }
    a[`questions[${qid}][type]`] = `control_${field_type}`;
    a[`questions[${qid}][name]`] = `${field_text}`;
    a[`questions[${qid}][text]`] = `${field_text}`;
    a[`questions[${qid}][order]`] = `${qid}`;

    return a
}

//social media about jotform
export const social_jotform = (selectedText) => {
    let parcing = selectedText.split('\n');
    return parcing.filter((item) => {
        if(item.slice(0,2) == '::'){
            return item
        }
    })
}