import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useAppColors } from "@/constants/app-colors";
import useCigaretteTypes from "@/hooks/useCigaretteTypes";
import CigaretteTypeCard from "@/components/cards/CigaretteTypeCard";
import CigaretteTypeModal from "@/components/modals/CigaretteTypeModal";
import AddTypeButton from "@/components/buttons/AddTypeButton";
import EmptyCigaretteTypes from "@/components/empty-states/EmptyCigaretteTypes";
import ScreenHeader from "@/components/headers/ScreenHeader";

export default function CigaretteTypesScreen() {
  const colors = useAppColors();

  const { types, loading, saving, loadTypes, saveType, confirmDelete } =
    useCigaretteTypes();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    void loadTypes();
  }, [loadTypes]);

  const openAddModal = () => {
    setEditingType(null);
    setName("");
    setModalVisible(true);
  };

  const openEditModal = (type: string) => {
    setEditingType(type);
    setName(type);
    setModalVisible(true);
  };

  const handleSaveType = async () => {
    const saved = await saveType(name, editingType);

    if (saved) {
      setModalVisible(false);
      setName("");
      setEditingType(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <ScreenHeader
          title="Τύποι τσιγάρων"
          subtitle={`${types.length} ${
            types.length === 1 ? "τύπος" : "τύποι"
          } αποθηκευμένοι`}
        />

        <AddTypeButton onPress={openAddModal} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.accent}
          style={styles.loader}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {types.length === 0 ? (
            <EmptyCigaretteTypes onAddPress={openAddModal} />
          ) : (
            types.map((type) => (
              <CigaretteTypeCard
                key={type}
                type={type}
                onEdit={() => openEditModal(type)}
                onDelete={() => confirmDelete(type)}
              />
            ))
          )}
        </ScrollView>
      )}

      <CigaretteTypeModal
        visible={modalVisible}
        editingType={editingType}
        name={name}
        saving={saving}
        onChangeName={setName}
        onSave={() => void handleSaveType()}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 65,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  loader: {
    marginTop: 50,
  },
  list: {
    paddingBottom: 32,
  },
});
