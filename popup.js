document.addEventListener('DOMContentLoaded', function() {
    const prefixInputs = [
      document.getElementById('prefix1'),
      document.getElementById('prefix2'),
      document.getElementById('prefix3')
    ];
    const saveButton = document.getElementById('save');
    const appendButtons = [
      document.getElementById('append1'),
      document.getElementById('append2'),
      document.getElementById('append3')
    ];
  
    // Load saved prefixes
    chrome.storage.sync.get(['prefixes'], function(result) {
      const savedPrefixes = result.prefixes || ['', '', ''];
      prefixInputs.forEach((input, index) => {
        input.value = savedPrefixes[index];
      });
    });
  
    // Save prefixes
    saveButton.addEventListener('click', function() {
      const prefixes = prefixInputs.map(input => input.value);
      chrome.storage.sync.set({prefixes}, function() {
        console.log('Prefixes saved');
        alert('Prefixes saved successfully!');
      });
    });
  
    // Append prefix function
    function appendPrefix(index) {
      chrome.storage.sync.get(['prefixes'], function(result) {
        const prefixes = result.prefixes || ['', '', ''];
        const prefix = prefixes[index];
        if (prefix) {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currentUrl = tabs[0].url;
            let newUrl = prefix + currentUrl;
            chrome.tabs.update(tabs[0].id, {url: newUrl});
          });
        } else {
          alert('Please save a prefix first!');
        }
      });
    }
  
    // Append prefix button listeners
    appendButtons.forEach((button, index) => {
      button.addEventListener('click', () => appendPrefix(index));
    });
  });