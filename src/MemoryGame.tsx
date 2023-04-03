import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, Text} from '@chakra-ui/react';

interface Card {
    id: number;
    isFlipped: boolean;
    image: string;
}

const MemoryGame = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const savedHighScore = localStorage.getItem('highScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    const images: string[] = [];
    let loadedImages = 0;
    for (let i = 1; i <= 12; i++) {
        const img = new Image();
        img.src = `${process.env.PUBLIC_URL}/${String(i).padStart(2, '0')}.jpg`;
        img.onload = () => {
            loadedImages++;
            if (loadedImages === 12) {
                setImagesLoaded(true);
            }
        };
        images.push(img.src);
    }

    const initializeCards = () => {
        const cards: Card[] = [];
        for (let i = 0; i < 12; i++) {
            cards.push({id: i, isFlipped: false, image: images[i]});
        }
        setCards(cards);
    };

    const shuffleCards = () => {
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        setCards(shuffledCards);
    };

    const handleCardClick = (id: number) => {
        const cardIndex = cards.findIndex((card) => card.id === id);
        if (!cards[cardIndex].isFlipped) {
            const newCards = [...cards];
            newCards[cardIndex].isFlipped = true;
            setScore(score + 1);
            setCards(newCards);
            shuffleCards();
        } else {
            alert(`Game over! Your score is ${score}.`);
            initializeCards();
            checkAndSaveHighScore(score);
            setScore(0);
        }
    };

    const checkAndSaveHighScore = (score: number) => {
        if (score <= highScore) return;
        localStorage.setItem('highScore', (score).toString());
        setHighScore(score);
    }

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Memory Game
            </Text>
            <Text>Score: {score}</Text>
            <Text>High Score: {highScore}</Text>
            <Button onClick={initializeCards} mt={4} mb={2}>
                Start Game
            </Button>
            <Button onClick={shuffleCards} mt={4} mb={2} ml={2}>
                Shuffle Cards
            </Button>
            <Flex flexWrap="wrap">
                {cards.map((card) => (
                    <Box
                        key={card.id}
                        w="100px"
                        h="100px"
                        bgImage={`url(${card.image})`}
                        bgSize="cover"
                        bgRepeat="no-repeat"
                        m={2}
                        cursor={card.isFlipped ? 'default' : 'pointer'}
                        onClick={() => handleCardClick(card.id)}
                        _hover={{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)', transform: 'scale(1.1)'}}
                        transition="transform 0.2s"
                    />
                ))}
            </Flex>
        </Box>
    );
};

export default MemoryGame;
