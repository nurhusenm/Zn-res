'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getMenuItems, deleteMenuItem } from '@/lib/db/schema';

// Rest of the file remains the same... 