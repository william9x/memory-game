import * as React from 'react';
import {Box, ChakraProvider} from '@chakra-ui/react';
import MemoryGame from './MemoryGame';

function App() {
    return (
        <ChakraProvider>
            <Box maxW="md" mx="auto" p={4}>
                <MemoryGame/>
            </Box>
        </ChakraProvider>
    );
}

export default App;