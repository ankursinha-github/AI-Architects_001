function copyToClipboard(button) {
    const codeBlock = button.closest('.code_block');
    const codeElement = codeBlock.querySelector('pre code');
    let codeText = codeElement.textContent;

    // Trim leading and trailing whitespace from each line
    const trimmedCodeText = codeText.split('\n').map(line => line.trimStart()).join('\n');

    navigator.clipboard.writeText(trimmedCodeText).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = "green";

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "#3498db";
        }, 2000);
        
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}
