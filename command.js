var commands = [];

function cmd(info, func) {
    // Create a copy of info to avoid modifying the original object
    var data = {...info};
    
    // Set the function
    data.function = func;
    
    // Set default values for properties if they don't exist
    if (data.dontAddCommandList === undefined) data.dontAddCommandList = false;
    if (data.desc === undefined) data.desc = '';
    if (data.fromMe === undefined) data.fromMe = false;
    if (data.category === undefined) data.category = 'misc';
    if (data.filename === undefined) data.filename = "Not Provided";
    
    // Add to commands array if not specified to exclude
    if (!data.dontAddCommandList) {
        commands.push(data);
    }

 return data;
}

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
};
