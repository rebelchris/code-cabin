'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from "lucide-react";

interface LikeStatus {
    likes: number;
    hasLiked: boolean;
    message?: string;
}

interface LikeButtonProps {
    postId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial status on mount
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`/api/post/${postId}/like?checkStatus=true`);
                if (res.ok) {
                    const data: LikeStatus = await res.json();
                    setLikes(data.likes);
                    setHasLiked(data.hasLiked);
                }
            } catch (err) {
                console.error("Error fetching status:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatus();
    }, [postId]);

    // Handle like action
    const handleLike = async () => {
        if (hasLiked || isLoading) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/post/${postId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data: LikeStatus = await res.json();

            if (res.ok || res.status === 409) {
                setLikes(data.likes);
                setHasLiked(true);
            }
        } catch (err) {
            console.error("Error posting like:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={hasLiked || isLoading}
            className={`group/like flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all ${
                hasLiked
                    ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400"
                    : "text-muted-foreground hover:bg-muted/50"
            }`}
        >
            <Heart
                className={`h-4 w-4 transition-all ${
                    hasLiked ? "fill-current animate-in zoom-in-50" : "group-hover/like:scale-110"
                }`}
            />
            <span className="font-medium">{isLoading ? '...' : likes}</span>
        </button>
    );
};

export default LikeButton;
