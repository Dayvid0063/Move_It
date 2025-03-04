import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RenderTopBrandsProps = {
    topBrands: Brand[];
};

// Update the function to accept the new props type
export const TopBrands = ({ topBrands }: RenderTopBrandsProps) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
            {topBrands.map((brand: Brand) => (
                <TouchableOpacity key={brand.id} style={styles.brandButton}>
                    <Image source={{uri: brand.image}} style={styles.brandImage} />
                    <Text style={styles.brandName}>{brand.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    section: {
        marginTop: SIZES.md,
        paddingHorizontal: SIZES.md,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.black,
        marginHorizontal: SIZES.md,
        marginBottom: SIZES.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.md,
    },
    seeAllButton: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        fontSize: 15,
    },
    categoriesContainer: {
        paddingHorizontal: SIZES.md,
        paddingVertical: SIZES.sm,
    },
    brandButton: {
        alignItems: 'center',
        marginRight: SIZES.md,
    },
    brandImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: SIZES.xs,
    },
    brandName: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.gray[600],
    },
});
