import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useLibrary } from "../../../contexts/LibraryContext";
import { Song } from "@/types/songs";

const SearchForm: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const { songs, setSongs } = useLibrary() as {
    songs: Song[];
    setSongs: (songs: Song[]) => void;
  };
  const [originalSongs, setOriginalSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (songs.length > 0 && originalSongs.length === 0) setOriginalSongs(songs);
  }, [songs, originalSongs]);

  const onSearch = (key: string) => {
    const lowerKey = key.toLowerCase().trim();
    if (lowerKey === "") return setSongs(originalSongs);
    const filteredSongs = originalSongs.filter(
      (s) =>
        s.title.toLowerCase().includes(lowerKey) ||
        s.artist.toLowerCase().includes(lowerKey) ||
        s.album.toLowerCase().includes(lowerKey)
    );
    setSongs(filteredSongs);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Wanna Search?"
        value={searchKey}
        onChangeText={(text) => {
          setSearchKey(text);
          onSearch(text);
        }}
        style={styles.input}
        placeholderTextColor="#ccc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", padding: 10, width: "100%", top: 15, marginBottom: 30 },
  input: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, width: 300, maxWidth: 300, backgroundColor: "rgba(59, 59, 59, 0.514)", color: "#fff", fontSize: 16 },
});

export default SearchForm;
