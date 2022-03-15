async function* JSONArrayStreamer(fetchResource, options) {
    const startStr = options?.startStr ?? '[';
    const endStr = options?.endStr ?? ']';
    const dbRes = await fetch(fetchResource);
    const reader = dbRes.body.getReader();
    const decoder = new TextDecoder('utf-8', {'fatal' : true});

    let foundStart;
    let existingData = '';
    do {
        const { value: chunk, done: readerDone } = await reader.read();
        if(chunk) {
            existingData += decoder.decode(chunk, {'stream' : true});
            // find the start token and exclude it and before from the string
            if(!foundStart) {
                const startStrIndex = existingData.indexOf(startStr);
                if(startStrIndex === -1) {
                    console.log('existingData does not start with ' + startStr);
                    continue;
                }
                existingData = existingData.slice(startStrIndex + startStr.length);
                foundStart = 1;
            }
            // array items are seperated by ','.
            // attempt parse the input as an array each time it's found
            let toSearch = existingData;
            do {
                const seperatorIndex = toSearch.lastIndexOf(',');
                if(seperatorIndex === -1) break;
                toSearch = toSearch.slice(0, seperatorIndex);
                try {
                    const records = JSON.parse('['+toSearch+']');
                    yield records;
                    existingData = existingData.slice(toSearch.length+1);
                    break;
                }
                catch {
                }
            } while(1);
        }
        if(readerDone) break;
    } while(1);
    // search backwards for the end token
    // attempting to parse the input as an array each time it's found
    do {
        const endIndex = existingData.lastIndexOf(endStr);
        if(endIndex === -1) {
            throw("Failed to find json end!");
        }
        existingData = existingData.slice(0, endIndex);
        try {
            const records = JSON.parse('['+existingData + ']');
            yield records;
            return;
        }
        catch {
        }
    } while(1);
};

export {JSONArrayStreamer};
