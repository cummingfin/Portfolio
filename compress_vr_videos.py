#!/usr/bin/env python3
"""
Compress VR videos for web optimization
"""

import os
import subprocess
import sys

def compress_video(input_path, output_path, crf=28, preset='medium'):
    """Compress a video using FFmpeg"""
    try:
        cmd = [
            'ffmpeg',
            '-i', input_path,
            '-c:v', 'libx264',
            '-crf', str(crf),
            '-preset', preset,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',
            '-y',  # Overwrite output file
            output_path
        ]
        
        print(f"Compressing: {input_path}")
        print(f"Output: {output_path}")
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            # Get file sizes
            input_size = os.path.getsize(input_path) / (1024 * 1024)  # MB
            output_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
            compression_ratio = (1 - output_size / input_size) * 100
            
            print(f"✅ Success! Compressed from {input_size:.1f}MB to {output_size:.1f}MB ({compression_ratio:.1f}% reduction)")
            return True
        else:
            print(f"❌ Error compressing {input_path}:")
            print(result.stderr)
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    # VR video files to compress
    vr_videos = [
        {
            'input': 'Assets/Inner path/Inner Path VR.mp4',
            'output': 'Assets/Inner path/Inner Path VR_compressed.mp4'
        },
        {
            'input': 'Assets/Canopy of Echos/Our Final Video.mov',
            'output': 'Assets/Canopy of Echos/Our Final Video_compressed.mp4'
        }
    ]
    
    print("🎬 VR Video Compression Script")
    print("=" * 40)
    
    # Check if FFmpeg is available
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ FFmpeg not found. Please install FFmpeg first.")
        print("   macOS: brew install ffmpeg")
        print("   Windows: Download from https://ffmpeg.org/")
        sys.exit(1)
    
    compressed_count = 0
    
    for video in vr_videos:
        if os.path.exists(video['input']):
            if compress_video(video['input'], video['output']):
                compressed_count += 1
        else:
            print(f"⚠️  File not found: {video['input']}")
    
    print("\n" + "=" * 40)
    print(f"✅ Compression complete! {compressed_count}/{len(vr_videos)} videos processed.")
    
    if compressed_count > 0:
        print("\n📝 Next steps:")
        print("1. Update the HTML to use the compressed videos")
        print("2. Test the videos in your browser")
        print("3. Delete the original large files if satisfied")

if __name__ == "__main__":
    main()
