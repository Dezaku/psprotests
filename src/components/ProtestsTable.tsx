import React, { useState } from "react";
import protestsData from "@/data/protests.json";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Comprehensive country to flag mapping
const getCountryFlag = (countryName: string): string => {
  const flagMap: { [key: string]: string } = {
    // Europe
    "Germany": "🇩🇪", "France": "🇫🇷", "United Kingdom": "🇬🇧", "Spain": "🇪🇸", "Italy": "🇮🇹",
    "Netherlands": "🇳🇱", "Belgium": "🇧🇪", "Sweden": "🇸🇪", "Norway": "🇳🇴", "Denmark": "🇩🇰",
    "Finland": "🇫🇮", "Austria": "🇦🇹", "Switzerland": "🇨🇭", "Ireland": "🇮🇪", "Portugal": "🇵🇹",
    "Greece": "🇬🇷", "Poland": "🇵🇱", "Czech Republic": "🇨🇿", "Hungary": "🇭🇺", "Romania": "🇷🇴",
    "Bulgaria": "🇧🇬", "Croatia": "🇭🇷", "Slovenia": "🇸🇮", "Slovakia": "🇸🇰", "Lithuania": "🇱🇹",
    "Latvia": "🇱🇻", "Estonia": "🇪🇪", "Luxembourg": "🇱🇺", "Malta": "🇲🇹", "Cyprus": "🇨🇾",
    "Iceland": "🇮🇸", "Liechtenstein": "🇱🇮", "Monaco": "🇲🇨", "Andorra": "🇦🇩", "San Marino": "🇸🇲",
    "Vatican City": "🇻🇦", "Albania": "🇦🇱", "North Macedonia": "🇲🇰", "Montenegro": "🇲🇪",
    "Bosnia and Herzegovina": "🇧🇦", "Serbia": "🇷🇸", "Kosovo": "🇽🇰", "Moldova": "🇲🇩",
    "Ukraine": "🇺🇦", "Belarus": "🇧🇾", "Russia": "🇷🇺",

    // North America
    "United States": "🇺🇸", "Canada": "🇨🇦", "Mexico": "🇲🇽", "Cuba": "🇨🇺", "Jamaica": "🇯🇲",
    "Haiti": "🇭🇹", "Dominican Republic": "🇩🇴", "Puerto Rico": "🇵🇷", "Bahamas": "🇧🇸",
    "Barbados": "🇧🇧", "Trinidad and Tobago": "🇹🇹", "Grenada": "🇬🇩", "Saint Lucia": "🇱🇨",
    "Saint Vincent and the Grenadines": "🇻🇨", "Antigua and Barbuda": "🇦🇬", "Dominica": "🇩🇲",
    "Saint Kitts and Nevis": "🇰🇳", "Belize": "🇧🇿", "Guatemala": "🇬🇹", "Honduras": "🇭🇳",
    "El Salvador": "🇸🇻", "Nicaragua": "🇳🇮", "Costa Rica": "🇨🇷", "Panama": "🇵🇦",

    // South America
    "Brazil": "🇧🇷", "Argentina": "🇦🇷", "Chile": "🇨🇱", "Peru": "🇵🇪", "Colombia": "🇨🇴",
    "Venezuela": "🇻🇪", "Ecuador": "🇪🇨", "Bolivia": "🇧🇴", "Paraguay": "🇵🇾", "Uruguay": "🇺🇾",
    "Guyana": "🇬🇾", "Suriname": "🇸🇷", "French Guiana": "🇬🇫",

    // Asia
    "China": "🇨🇳", "Japan": "🇯🇵", "South Korea": "🇰🇷", "North Korea": "🇰🇵", "India": "🇮🇳",
    "Pakistan": "🇵🇰", "Bangladesh": "🇧🇩", "Sri Lanka": "🇱🇰", "Nepal": "🇳🇵", "Bhutan": "🇧🇹",
    "Maldives": "🇲🇻", "Afghanistan": "🇦🇫", "Iran": "🇮🇷", "Iraq": "🇮🇶", "Syria": "🇸🇾",
    "Lebanon": "🇱🇧", "Jordan": "🇯🇴", "Israel": "🇮🇱", "Palestine": "🇵🇸", "Saudi Arabia": "🇸🇦",
    "Yemen": "🇾🇪", "Oman": "🇴🇲", "United Arab Emirates": "🇦🇪", "Qatar": "🇶🇦", "Kuwait": "🇰🇼",
    "Bahrain": "🇧🇭", "Turkey": "🇹🇷", "Georgia": "🇬🇪", "Armenia": "🇦🇲", "Azerbaijan": "🇦🇿",
    "Kazakhstan": "🇰🇿", "Uzbekistan": "🇺🇿", "Turkmenistan": "🇹🇲", "Kyrgyzstan": "🇰🇬",
    "Tajikistan": "🇹🇯", "Mongolia": "🇲🇳", "Vietnam": "🇻🇳", "Laos": "🇱🇦", "Cambodia": "🇰🇭",
    "Thailand": "🇹🇭", "Myanmar": "🇲🇲", "Malaysia": "🇲🇾", "Singapore": "🇸🇬", "Indonesia": "🇮🇩",
    "Philippines": "🇵🇭", "Brunei": "🇧🇳", "East Timor": "🇹🇱", "Taiwan": "🇹🇼", "Hong Kong": "🇭🇰",
    "Macau": "🇲🇴",

    // Africa
    "Egypt": "🇪🇬", "Libya": "🇱🇾", "Tunisia": "🇹🇳", "Algeria": "🇩🇿", "Morocco": "🇲🇦",
    "Sudan": "🇸🇩", "South Sudan": "🇸🇸", "Ethiopia": "🇪🇹", "Eritrea": "🇪🇷", "Djibouti": "🇩🇯",
    "Somalia": "🇸🇴", "Kenya": "🇰🇪", "Uganda": "🇺🇬", "Tanzania": "🇹🇿", "Rwanda": "🇷🇼",
    "Burundi": "🇧🇮", "Democratic Republic of the Congo": "🇨🇩", "Republic of the Congo": "🇨🇬",
    "Central African Republic": "🇨🇫", "Chad": "🇹🇩", "Cameroon": "🇨🇲", "Nigeria": "🇳🇬",
    "Niger": "🇳🇪", "Mali": "🇲🇱", "Burkina Faso": "🇧🇫", "Senegal": "🇸🇳", "Gambia": "🇬🇲",
    "Guinea-Bissau": "🇬🇼", "Guinea": "🇬🇳", "Sierra Leone": "🇸🇱", "Liberia": "🇱🇷",
    "Ivory Coast": "🇨🇮", "Ghana": "🇬🇭", "Togo": "🇹🇬", "Benin": "🇧🇯", "Gabon": "🇬🇦",
    "Equatorial Guinea": "🇬🇶", "São Tomé and Príncipe": "🇸🇹", "Angola": "🇦🇴", "Zambia": "🇿🇲",
    "Malawi": "🇲🇼", "Mozambique": "🇲🇿", "Zimbabwe": "🇿🇼", "Botswana": "🇧🇼", "Namibia": "🇳🇦",
    "South Africa": "🇿🇦", "Lesotho": "🇱🇸", "Eswatini": "🇸🇿", "Madagascar": "🇲🇬",
    "Comoros": "🇰🇲", "Mauritius": "🇲🇺", "Seychelles": "🇸🇨", "Cape Verde": "🇨🇻",

    // Oceania
    "Australia": "🇦🇺", "New Zealand": "🇳🇿", "Papua New Guinea": "🇵🇬", "Fiji": "🇫🇯",
    "Solomon Islands": "🇸🇧", "Vanuatu": "🇻🇺", "New Caledonia": "🇳🇨", "French Polynesia": "🇵🇫",
    "Samoa": "🇼🇸", "Tonga": "🇹🇴", "Tuvalu": "🇹🇻", "Kiribati": "🇰🇮", "Nauru": "🇳🇷",
    "Palau": "🇵🇼", "Micronesia": "🇫🇲", "Marshall Islands": "🇲🇭",

    // Common variations and abbreviations
    "USA": "🇺🇸", "UK": "🇬🇧", "UAE": "🇦🇪", "DRC": "🇨🇩", "CAR": "🇨🇫",
    "Cote d'Ivoire": "🇨🇮", "Timor-Leste": "🇹🇱", "Swaziland": "🇸🇿", "Czechia": "🇨🇿",
    "Macedonia": "🇲🇰", "State of Palestine": "🇵🇸", "Palestinian Territories": "🇵🇸"
  };
  
  // Try exact match first
  if (flagMap[countryName]) {
    return flagMap[countryName];
  }
  
  // Try case-insensitive match
  const lowerCountryName = countryName.toLowerCase();
  for (const [country, flag] of Object.entries(flagMap)) {
    if (country.toLowerCase() === lowerCountryName) {
      return flag;
    }
  }
  
  // If no match found, return a generic flag
  return "🏳️";
};

type SortField = 'country' | 'city' | 'location' | 'startTime' | null;
type SortDirection = 'asc' | 'desc' | null;

export default function ProtestsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const itemsPerPage = 10;

  // Handle column sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Get sort indicator
  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return "↕️";
    if (sortDirection === 'asc') return "↑";
    if (sortDirection === 'desc') return "↓";
    return "↕️";
  };

  // Filter protests based on search term
  const filteredProtests = searchTerm.trim() === "" 
    ? protestsData 
    : protestsData.filter((protest) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          protest.country.toLowerCase().includes(searchLower) ||
          protest.city.toLowerCase().includes(searchLower) ||
          protest.locationName.toLowerCase().includes(searchLower)
        );
      });

  // Sort protests
  const sortedProtests = [...filteredProtests].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    let aValue: string;
    let bValue: string;
    
    switch (sortField) {
      case 'country':
        aValue = a.country.toLowerCase();
        bValue = b.country.toLowerCase();
        break;
      case 'city':
        aValue = a.city.toLowerCase();
        bValue = b.city.toLowerCase();
        break;
      case 'location':
        aValue = a.locationName.toLowerCase();
        bValue = b.locationName.toLowerCase();
        break;
      case 'startTime':
        aValue = a.startTime;
        bValue = b.startTime;
        break;
      default:
        return 0;
    }
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProtests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProtests = sortedProtests.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="space-y-4 w-full">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by country, city, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table Container with horizontal scroll */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px] bg-white rounded-lg shadow-sm">
          <TableHeader>
            <TableRow>
              <TableHead 
                className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:bg-gray-50 select-none w-1/4"
                onClick={() => handleSort('country')}
              >
                Country
              </TableHead>
              <TableHead 
                className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:bg-gray-50 select-none w-1/4"
                onClick={() => handleSort('city')}
              >
                City
              </TableHead>
              <TableHead 
                className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:bg-gray-50 select-none w-1/3"
                onClick={() => handleSort('location')}
              >
                Location
              </TableHead>
              <TableHead 
                className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 cursor-pointer hover:bg-gray-50 select-none w-1/6"
                onClick={() => handleSort('startTime')}
              >
                Start Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProtests.map((protest) => (
              <TableRow key={protest.id}>
                <TableCell className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 w-1/4">
                  <span className="mr-2">{getCountryFlag(protest.country)}</span>
                  {protest.country}
                </TableCell>
                <TableCell className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 w-1/4">{protest.city}</TableCell>
                <TableCell className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 w-1/3">{protest.locationName}</TableCell>
                <TableCell className="text-xs md:text-sm px-4 py-3 md:px-6 md:py-4 w-1/6">{protest.startTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Results count and Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        {/* Results count on the left */}
        <div className="text-xs md:text-sm text-gray-600">
          {sortedProtests.length} protest{sortedProtests.length !== 1 ? 's' : ''} found
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          {sortField && ` • Sorted by ${sortField} ${sortDirection === 'asc' ? '(A-Z)' : '(Z-A)'}`}
        </div>

        {/* Pagination on the right */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            
            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded ${
                    currentPage === page 
                      ? 'bg-orange-500 text-white border-orange-500' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm border rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* No results message */}
      {sortedProtests.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500 text-sm md:text-base">
          No protests found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
} 