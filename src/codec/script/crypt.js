(() => {
    async function encodeLevelWin(decodedString) {
        // Convert string to stream bytes
        const blob = new Blob([decodedString]);
        const stream = blob.stream().pipeThrough(new CompressionStream('gzip'));
        const response = new Response(stream);
        const buffer = await response.arrayBuffer();

        // Convert binary buffer to standard Base-64 string
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        const base64 = btoa(binary);

        // Convert standard B64 to GD's URL-safe variant
        return base64.replace(/\+/g, '-').replace(/\//g, '_');
    }
    async function decodeLevelWin(encodedString, isOfficialLevel = false) {
        // Fix magic prefix
        const magicPrefix = 'H4sIAAAAAAAAA';
        if (isOfficialLevel && !encodedString.startsWith(magicPrefix))
            encodedString = magicPrefix + encodedString;
        // Infer if the level is an official level
        if (encodedString.startsWith(magicPrefix))
            isOfficialLevel = true;

        // Fix URL-safe Base64 characters
        const base64 = encodedString.replace(/-/g, '+').replace(/_/g, '/');

        // Convert Base64 string to a binary typed array
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Decompress via Browser Compression Stream API (GZIP)
        const stream = new Response(bytes).body.pipeThrough(new DecompressionStream('gzip'));
        const decompressedResponse = new Response(stream);

        return await decompressedResponse.text();
    }

    globalThis.levelCrypt = {
        win: {
            encode: encodeLevelWin,
            decode: decodeLevelWin,
        },
        mac: {
            // TODO
            encode: null,
            decode: null,
        }
    }
})();
